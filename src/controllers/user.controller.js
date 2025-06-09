import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAcessandRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken 
        await user.save({validateBeforeSave : true})

        return {accessToken , refreshToken}
    } catch (error) {
        throw new ApiError(500 , "Something went wrong while generating refresh and access tokem=n")
    }
}


const registerUser = asyncHandler(async(req , res) => {
    const {fullName , email , username , password } = req.body
    // console.log(email);

    if([fullName , email , username , password].some((field) => field?.trim() === "" )){
        throw new ApiError(400 , "ALL fields are required")
    }
    const existedUser = await User.findOne({ // bug resolved await bug
        $or : [{username} , {email}]
    })
    if(existedUser){
        throw new ApiError(409 , "User with email or username already exist")
    }

    // console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path
    // const coverImageLocalPath = req.file?.coverImage[0]?.path

    let coverImageLocalPath ; 
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.file?.coverImage[0]?.path
    }


    // atleast humare paas avatar to chaiye hi 
    if(!avatarLocalPath){
        throw new ApiError(400 , "Avatar file is required")
    }

    const avatar = await uploadCloudinary(avatarLocalPath) ; 
    const coverImage = await uploadCloudinary(coverImageLocalPath) ;  // yaha par to await karo , aage mat badho jab tak samne nahi jaate hai 

    if(!avatar){
        throw new ApiError(400 , "Avatar file is required")
    }

    const user = await User.create({
        fullName,  
        avatar : avatar.url , 
        coverImage : coverImage?.url || "" , 
        email , 
        password , 
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id)?.select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500 , "Something went wrong while registring a user")
    }

    return res.status(201).json(
        new ApiResponse(200 , createdUser , "User registered successfully")
    )


})

const loginUser = asyncHandler(async(req , res) => {
    const {email , username , password} = req.body 
    if(!username || !email){
        throw new ApiError(400 , "Username or email is required")
    }
    const user = await User.findOne({
        $or : [{username , email}]
    })

    if(!user){
        throw new ApiError(404 , "User do not exist")
    }

    const ispasswordValid = await user.isPasswordCorrect(password , this.password)
    if(!ispasswordValid){
        throw new ApiError(401 , "Invalid user credentials")
    }

    const {accessToken , refreshToken } = await generateAcessandRefreshTokens(user._id)

    const loggedInUser = User.findById(user._id).select( "-password -refreshToken")

    const options = {
        httpOnly: true , 
        secure : true 
    }

    return res.status(200).cookie("accessToken" , accessToken , options)
                          .cookie("refreshToken" , refreshToken , options)
                          .json(
                            new ApiResponse(200 , {
                                user : loggedInUser , 
                                accessToken , refreshToken
                            },
                            "User logged in succesfully"
                            )
                          )
})

const logoutUser = asyncHandler(async(req , res) => {
    await User.findByIdAndUpdate(
        req.user._id , 
        {
            $set : {
                refreshToken : undefined
            }
        } , 
        {
            new : true
        }
    )
    const options = {
        httpOnly: true , 
        secure : true 
    }
    return res.status(200)
              .clearCookie("accessToken" , options)
              .clearCookie("refreshToken" , options)
              .json(new ApiResponse(200 , {} , "User logged Out"))
})

export {registerUser , loginUser , logoutUser}
