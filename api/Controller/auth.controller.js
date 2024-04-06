import User from '../Models/user.model.js'
import bcryptjs from 'bcryptjs'
export const signup=async(req,res)=>{
    const {username,email,password}=req.body;
    
    const existedUser=await User.findOne({email});
    if(existedUser) return res.status(403).json({msg:"user already registered"})

    const hashPassword=bcryptjs.hashSync(password,10)

    const newUser=await User.create({username,password:hashPassword,email});

    res.status(200).json({
        msg:'user created',
        data:newUser
    })
    
}