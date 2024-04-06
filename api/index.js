import express from "express";
const app=express();
import dotenv from 'dotenv'
import mongoose from "mongoose";
import authRouter from './Routes/auth.route.js'


app.use(express.json())
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