import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"



const app = new express(); 
app.use(cors({
    origin : process.env.CORS_ORIGINE ,
    credentials : true 
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true , limit : "16kb"}))
app.use(express.static("public")) // aise kuch accets aye to public me rakh do  
app.use(cookieParser())





export default app