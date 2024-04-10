import express from "express";
const router=express.Router();
import {createListing,updateListing,deleteListing,getUserListing,getListing,getAllSearchListing} from '../Controller/listing.controller.js'
import {verifyUser} from '../Middleware/verifyToken.js'


router.post('/create',verifyUser,createListing)
router.put('/update/:id',verifyUser,updateListing)
router.delete('/delete/:id',verifyUser,deleteListing)
router.get('/listing/:id',verifyUser,getUserListing)
router.get('/get/:id',getListing);

//search
router.get('/get',getAllSearchListing)



export default router;