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


//app/v1/list/get
export const getAllSearchListing = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let offer = req.query.offer;
  
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
      }
  
      let furnished = req.query.furnished;
  
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      }
  
      let parking = req.query.parking;
  
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };
      }
  
      let type = req.query.type;
  
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent'] };
      }
  
      const searchTerm = req.query.searchTerm || '';
  
      const sort = req.query.sort || 'createdAt';
  
      const order = req.query.order || 'desc';
  
      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: 'i' },
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };