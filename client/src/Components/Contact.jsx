import React, { useEffect ,useState } from 'react'
import { Link } from 'react-router-dom';

function Contact({listing}) {
    console.log('listing is',listing)
    const[landlord,setLandlord]=useState(null);
    const [message,setMessage]=useState('')
    const handleChange=(e)=>{
        setMessage(e.target.value)
    }
    
    useEffect(() => {
        const fetchLandlord = async () => {
          try {
            const res = await fetch(`/app/v1/user/${listing.userRef}`);
            const data = await res.json();
            setLandlord(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchLandlord();
      }, [listing.userRef]);
  return (
    <>
        {landlord && (
            <div className=' flex flex-col gap-3'>
                <p>Contact <span className='font-semibold '>{landlord.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>

                <textarea name='message' id='message' rows='2' value={message} onChange={handleChange} className='w-full border border-md rounded-lg p-3' placeholder='Enter your message'/>

                <Link to={`mailto:{landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-80'>
                    Send Message
                </Link>
            </div>
        )}
    </>
  )
}

export default Contact
