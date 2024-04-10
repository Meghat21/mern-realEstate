import Listing from '../Models/listing.model.js';
import listing from '../Models/listing.model.js'
import { errorHandler } from '../Utils/errorHandler.js';
export const createListing=async(req,res,next)=>{
    try {
        const createList=await Listing.create(req.body)
        res.status(201).json(createList); 

    } catch (error) {
        next(error)
    }
}

//app/v1/list/update/:id
export const updateListing=async(req,res,next)=>{
    const listingone=await Listing.findById(req.params.id);

    if(!listingone) {
        return next(errorHandler(404,'not found listing'))
    }

    if(req.user.userId !== listingone.userRef){
        return next(errorHandler(401,'update your own listing'))
    }

    try {
        const updateListing=await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json(updateListing);
    } catch (error) {
        next(error)
    }


}

//app/v1/list/delete/:iduser
export const deleteListing=async(req,res,next)=>{
    const listingone=await Listing.findById(req.params.id);

    if(!listingone) {
        return next(errorHandler(404,'not found listing'))
    }
    if(req.user.userId !== listingone.userRef){
        return next(errorHandler(401,'delete your own listing'))
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:"listing has been deleted"})
    } catch (error) {
        next(error)
    }
}

//app/v1/list/listing/:id
export const getUserListing=async(req,res,next)=>{
    if (req.user.userId !== req.params.id) {
        next(errorHandler(401,"view your own listing"))
    }else{
        const listing=await Listing.find({userRef:req.params.id});
        res.status(200).json(listing);
    }
}


//app/v1/listing/list/:id
export const getListing=async(req,res,next)=>{
    try {
        const listing=await Listing.findById(req.params.id);
        if(!listing) {
            return next(errorHandler(404,'not found listing'));
        }

        res.status(200).json(listing);
    } catch (error) {
       next(error) 
    }
}