import {errorHandler} from '../Utils/errorHandler.js'
import jwt from 'jsonwebtoken'

export const verifyUser=async(req,res,next)=>{
    console.log(req.cookies.access_toke)
    const token=req.cookies.access_toke;

    if(!token) return next(errorHandler(401,'Unauthorized'));

    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err) return next(errorHandler(403 ,'Forbidden'));

        req.user=user;
        next();
    })

}