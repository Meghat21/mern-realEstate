import React, { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import OAuth from '../Components/OAuth'


function Signup() {

  const [formData,setFormData]=useState({})
  const[errordata,setErrordata]=useState(null);
  const[loadingdata,setloadingdata]=useState(false);
  const navigate=useNavigate()

  const handleInput=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  
  const handleSubmit=async(e)=>{
    try {
      e.preventDefault();
      setloadingdata(true)
      const res=await fetch('/app/v1/auth/sign-up',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      }
    );
    const data=await res.json();
    if(data.success==false){
      setloadingdata(false);
      setErrordata(data.message);
      return
    }

    setloadingdata(false)
    setErrordata(null)
    navigate('/sign-in')
    console.log(data)
    } catch (error) {
      setloadingdata(false);
      setErrordata(error.message)
    }

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input onChange={handleInput} type="text" name="" id="username" placeholder='username' className='border p-3 rounded-lg'/>
        <input onChange={handleInput} type="text" name="" id="email" placeholder='email' className='border p-3 rounded-lg'/>
        <input onChange={handleInput} type="text" name="" id="password" placeholder='password' className='border p-3 rounded-lg'/>

        <button disabled={loadingdata} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80'>{loadingdata ? 'Loading ...' : 'Sign up'}</button>
        <OAuth/>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
            <span className='text-blue-700 '>Sign in</span>
        </Link>
      </div>
      {errordata && <p className='text-red-500 mt-5'>{errordata}</p>}
    </div>
  )
}

export default Signup
