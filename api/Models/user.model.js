import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:'https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp'
    }
},{timestamps:true});


const User=mongoose.model('user',userSchema);

export default User