import express from "express";
const router=express.Router();
import {createListing,updateListing,deleteListing,getUserListing} from '../Controller/listing.controller.js'
import {verifyUser} from '../Middleware/verifyToken.js'


router.post('/create',verifyUser,createListing)
router.post('/update',verifyUser,updateListing)
router.delete('/delete/:id',verifyUser,deleteListing)
router.get('/listing/:id',verifyUser,getUserListing)



export default router;