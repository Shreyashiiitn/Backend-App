import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



export const connectDB = async () => {
    try {
        const connectionsInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB Connected !! DB Host : ${connectionsInstance.connection.host}`);

    } catch (error) {
        console.log("NONGODB Connection error" , error);
        process.exit(1)
    }
}