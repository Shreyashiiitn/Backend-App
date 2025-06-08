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


// routes import
import userRouter from "./routes/user.routes.js";

// routes declaration 
app.use("/api/v1/users" , userRouter)


// this is done as a middle ware , http://localhost3000/api/v1/users/ {userrouter me jo jo diye hai , /login /register , etc etc call kiye jayege abb  }




export default app