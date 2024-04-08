import React from 'react'

function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl text-center my-7 font-semibold'>Create listing</h1>

        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" name="Name" id="Name" placeholder='Name' className='border p-3 rounded-lg' maxLength='62' minLength='10' required/>
                <textarea type="text" name="description" id="description" placeholder='description' className='border p-3 rounded-lg' required/>
                <input type="text" name="address" id="address" placeholder='address' className='border p-3 rounded-lg' required/>
                
                <div className="flex gap-6 flex-wrap">
                    <div className="">
                        <input type="checkbox" name="sell" id="sell" className='w-5'/><sapn>Sell</sapn>
                    </div>
                    <div className="">
                        <input type="checkbox" name="Rent" id="Rent" className='w-5'/><sapn>Rent</sapn>
                    </div> 
                    <div className="">
                        <input type="checkbox" name="Parking spot" id="Parking spot" className='w-5'/><sapn>Parking spot</sapn>
                    </div>
                    <div className="">
                        <input type="checkbox" name="Furnished" id="Furnished" className='w-5'/><sapn>Furnished</sapn>
                    </div>
                    <div className="">
                        <input type="checkbox" name="Offer" id="Offer" className='w-5'/><sapn>Offer</sapn>
                    </div>
                    
                </div>
                <div className="flex flex-wrap gap-6">

                <div className="flex items-center gap-2">
                    <input type="number" name="bedroom" id="bedroom" min='1' max="10" required className='p-3 border-gray-300 rounded-lg'/>
                    <span>Beds</span>
                    
                </div>
                <div className="flex items-center gap-2">
                    <input type="number" name="bathroom" id="bathroom" min='1' max="10" required className='p-3 border-gray-300 rounded-lg'/>
                    <span>Baths</span>
                    
                </div>
                <div className="flex items-center gap-2">
                    <input type="number" name="regularPrice" id="regularPrice" min='1' max="10" required className='p-3 border-gray-300 rounded-lg'/>
                    <div className="flex flex-col items-center">
                        <p>Regular Price</p>
                        <span className='text-xs'>($/Month)</span>
                    </div>
                    
                </div>
                <div className="flex items-center gap-2">
                    <input type="number" name="discountedPrice" id="discountedPrice" min='1' max="10" required className='p-3 border-gray-300 rounded-lg'/>
                    <div className="flex flex-col items-center">
                        <p>Discount Price</p>
                        <span className='text-xs'>($/Month)</span>
                    </div>

                </div>

                </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
                <p className='font-semibold'>Images : <span className='font-normal text-gray-700 ml-2'>The first image will be the cover (max 6)</span></p>
                <div className="flex gap-4">
                    <input className='p-3 border border-gray-300 rounded w-full' type="file" name="images" id="images" accept='image/*' multiple/>
                    <button className='p-3 text-green-700 border border-green-700 rounded uppercase shadow-lg disabled:opacity-80'>Upload</button>
                </div>
            <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>Create List</button>
            </div>

        </form>
    </main>
  )
}

export default CreateListing
