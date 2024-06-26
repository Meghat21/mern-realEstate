import express from "express";
const app=express();
import dotenv from 'dotenv'
import mongoose from "mongoose";
import authRouter from './Routes/auth.route.js'
import userRouter from './Routes/user.route.js'
import listRouter from './Routes/listing.route.js'
import cookieParser from 'cookie-parser'


app.use(express.json())
app.use(cookieParser())
dotenv.config()

//connect to db
mongoose.connect(process.env.MONGO_DB_URL)
.then(()=>{
    console.log("connected to db")
})
.catch((error)=>{
    console.log(`Error connecting to the database: ${error}`)
})

app.use('/app/v1/auth',authRouter)
app.use('/app/v1/user',userRouter)
app.use('/app/v1/list',listRouter)


//middleware
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal server error";

    return res.status(statusCode).json({
        success:false,
        statusCode:statusCode,
        message
    });
})

app.listen(process.env.PORT,()=>{
    console.log("listening to 8000")
})