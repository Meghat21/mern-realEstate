import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules'
import {useSelector} from 'react-redux'
import 'swiper/css/bundle';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';

function Listing() {
    const {currentUser} = useSelector(state => state.user)
    SwiperCore.use(Navigation);
    const params=useParams();
    const[Listing,setListing]=useState(null);
    const[loading,setLoading]=useState(true);
    const[error,seterror]=useState(false);

    useEffect(()=>{
        const fetchListing=async()=>{
            try {
                setLoading(true);
                const res=await fetch(`/app/v1/list/get/${params.listingId}`);
                const data=await res.json();
                if(data.success=== false){
                    seterror(true);
                    setLoading(false);
                    return;
                }
                setListing(data)
                setLoading(false)
                seterror(false)
            } catch (error) {
                seterror(true);
                setLoading(false);
            }    
        }
        fetchListing();
    },[params.listingId])
  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading .... </p>}
        {error && <p className='text-center my-7 text-2xl'>Something went wrong </p>}

        {Listing && !loading && !error && <>
            <Swiper navigation>
                {Listing.imageUrls.map((url)=>(
                    <SwiperSlide key={url}>
                        <div className='h-[550px]' style={{background:`url(${url}) center no-repeat`,backgroundSize:'cover' }}>
                            
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {Listing.name} - ${' '}
              {Listing.offer
                ? Listing.discountPrice.toLocaleString('en-US')
                : Listing.regularPrice.toLocaleString('en-US')}
              {Listing.type === 'rent' && ' / month'}
            </p>

            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {Listing.address}
            </p>
            
            <div className="flex gap-4">   
             <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-lg'>
                    {Listing.type === 'rent' ? 'For rent' : 'For sale'}
             </p>   
             {
                Listing.offer && (
                    <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-lg'>${+Listing.regularPrice - +Listing.discountPrice}</p>
                )
             }
            </div>
             <p className='text-slate-800'>
                <span className='font-semibold text-black'>
                    Description = {' '}
                </span>
                {Listing.description}
             </p>

             <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {Listing.bedrooms > 1
                  ? `${Listing.bedrooms} beds `
                  : `${Listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {Listing.bathrooms > 1
                  ? `${Listing.bathrooms} baths `
                  : `${Listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {Listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {Listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            
            </div>
        </>}
    </main>
  )
}

export default Listing
