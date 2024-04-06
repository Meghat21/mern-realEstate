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


app.listen(process.env.PORT,()=>{
    console.log("listening to 8000")
})