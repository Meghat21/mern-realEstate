import listing from '../Models/listing.model.js'
export const createListing=async(req,res,next)=>{
    try {
        const createList=await listing.create(req.body)
        res.status(201).json(createList); 

    } catch (error) {
        next(error)
    }
}