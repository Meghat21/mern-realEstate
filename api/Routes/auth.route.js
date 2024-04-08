import express from "express";

const router=express.Router();
import {signup,signin,google,signout} from '../Controller/auth.controller.js'

router.post('/sign-up',signup)
router.post('/sign-in',signin)
router.post('/google',google)
router.get('/signout',signout)




export default router;
