const asyncHandler  = (requestHandler) => {
    (req , res , next) => {
        Promise.resolve(
            requestHandler(req , res , next)
        ).catch((err) => next(err))
    }
}

export {asyncHandler}

// ++++++++++++This is the other method for doing the same ++++++++++++++++++



// const asyncHandler = (fn) => { () => {} }  function ko function me pass kar diya hia  
// const asyncHandler = (fn) => async (req , res , next) => {
//     try {
//         await fn(req , res , next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             sucess : false ,
//             message : error.message
//         })
//     }
// } 