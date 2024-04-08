import express from "express";
const router=express.Router();
import {createListing} from '../Controller/listing.controller.js'
import {verifyUser} from '../Middleware/verifyToken.js'


router.post('/create',verifyUser,createListing)


export default router;