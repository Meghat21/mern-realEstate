import express from "express";
const router=express.Router();
import {update,deleteUser,getUser} from '../Controller/user.controller.js'
import {verifyUser} from '../Middleware/verifyToken.js'

router.put('/update/:userId',verifyUser,update)
router.delete('/delete/:userId',verifyUser,deleteUser)
router.get('/:id',verifyUser,getUser);


export default router