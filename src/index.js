// require ('dotenv').config({path : './env'})
import dotenv from "dotenv"
import { connectDB } from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path : './env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log(`Server is listening to the PORT : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO DB connection failed !!!" , err);
})

















































/*
dont with iffi code , ya funnction banake usko call kar do 
;(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error" , (error) => {
            console.log("ERROR" , error);
            throw error
        })
        
        app.listen(process.env.PORT , () => {
            console.log(`App is listening on port ${PORT}`);
        })
    } catch (error) {
        console.error("ERROR" , error) ; 
        throw error
    }
})()

*/