import mongoose from "mongoose";

const db=mongoose.connect(process.env.MONGO_DB_URL)
.then(()=>{
    console.log("connected to db")
})
.catch((error)=>{
    console.log(`Error connecting to the database: ${error}`)
})

export default db