import Listing from '../Models/listing.model.js';
import listing from '../Models/listing.model.js'
import { errorHandler } from '../Utils/errorHandler.js';
export const createListing=async(req,res,next)=>{
    try {
        const createList=await listing.create(req.body)
        res.status(201).json(createList); 

    } catch (error) {
        next(error)
    }
}

//app/v1/list/update/:id
export const updateListing=async(req,res)=>{}

//app/v1/list/delete/:id
export const deleteListing=async(req,res)=>{}

//app/v1/list/listing/:id
export const getUserListing=async(req,res,next)=>{
    if (req.user.userId !== req.params.id) {
        next(errorHandler(401,"view your own listing"))
    }else{
        const listing=await Listing.find({userRef:req.params.id});
        res.status(200).json(listing);
    }
}
