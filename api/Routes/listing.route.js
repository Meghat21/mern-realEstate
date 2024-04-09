import express from "express";
const router=express.Router();
import {createListing,updateListing,deleteListing,getUserListing} from '../Controller/listing.controller.js'
import {verifyUser} from '../Middleware/verifyToken.js'


router.post('/create',verifyUser,createListing)
router.post('/update',verifyUser,updateListing)
router.post('/delete',verifyUser,deleteListing)
router.post('/listing/:id',verifyUser,getUserListing)



export default router;