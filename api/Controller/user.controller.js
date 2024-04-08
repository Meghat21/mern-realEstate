import User from '../Models/user.model.js'
import {errorHandler} from '../Utils/errorHandler.js'
import bcryptjs from 'bcryptjs';

export const update=async(req,res,next)=>{
    console.log(req.user);
    if(req.user.userId !== req.params.userId){
        return next(errorHandler(401,'you can only update your account'))
    }

    try {
        if(req.body.password){
            req.body.password=bcryptjs(req.body.password,10)
        }

        const updateUser=await User.findByIdAndUpdate(req.params.userId,
            {
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    photo:req.body.photo
                }
            },{new:true}
        );

        const {password,...rest}=updateUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }


}