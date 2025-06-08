import { v2 as cloudinary } from "cloudinary";
import fs from "fs" 

// Configuration
cloudinary.config({ 
    cloud_name:  process.env.CLOUDINARY_CLOUD_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null ; 
        // uplad the file on cloudinary
        const uploadResult = await cloudinary.uploader.upload(localFilePath , {
            resource_type : "auto"
        })
        //file has been upladed succesfully
        console.log("File is uploaded on cloudinary" , uploadResult.url);
        return uploadResult ; 
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the uplad operation got failed 
        return null ;
    }
}

export {uploadCloudinary} 
