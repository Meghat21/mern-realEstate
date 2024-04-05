import express from "express";
const app=express();
import dotenv from 'dotenv'
import mongoose from "mongoose";

dotenv.config()

//connect to db
mongoose.connect(process.env.MONGO_DB_URL)
.then(()=>{
    console.log("connected to db")
})
.catch((error)=>{
    console.log(`Error connecting to the database: ${error}`)
})


app.listen(process.env.PORT,()=>{
    console.log("listening to 8000")
})