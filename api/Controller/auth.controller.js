import User from '../Models/user.model.js'
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../Utils/errorHandler.js'
import jwt from 'jsonwebtoken'

export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    
    const existedUser=await User.findOne({email});
    if(existedUser) return res.status(403).json({msg:"user already registered"})

    const hashPassword=bcryptjs.hashSync(password,10)

    try {
        const newUser=await User.create({username,password:hashPassword,email});
    
        res.status(200).json({
            msg:'user created',
            data:newUser
        })
    } catch (error) {
        next(errorHandler(550,'Internal server error'))
    }
    
}

export const signin=async(req,res,next)=>{
    const {email,password}=req.body;

    try {
        const existedUser=await User.findOne({email});
        if(!existedUser) return next(errorHandler(401,'User dont exist'));

        const validPassword=bcryptjs.compareSync(password,existedUser.password);
        if(!validPassword) return next(errorHandler(401,'wrong credential'));

        const token=jwt.sign({userId:existedUser._id},process.env.SECRET_KEY);
        const {password:pass,...rest}=existedUser._doc;

        res.status(200).cookie('access_toke',token,{httpOnly:true}).json({
            msg:"user created",
            data:rest
        })


    } catch (error) {
        next(errorHandler(500,'internal server error'));
    }
}