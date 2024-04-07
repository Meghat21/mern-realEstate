import express from "express";
const router=express.Router();
import {update} from '../Controller/user.controller.js'
import {verifyUser} from '../Middleware/verifyToken.js'

router.put('/update/:userId',verifyUser,update)

export default router