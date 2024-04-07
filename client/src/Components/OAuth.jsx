import React from 'react'
import {app} from '../firebase'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../redux/userSlice';
import {useNavigate} from 'react-router-dom'

function OAuth() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleGoogleClick=async()=>{
    try {
      const provider=new GoogleAuthProvider()
      const auth=getAuth(app)

      const result=await signInWithPopup(auth,provider)

      const res=await fetch('/app/v1/auth/google',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({username:result.user.displayName,email:result.user.email,photo:result.user.photoURL}),

      });
      const data=await res.json();
      dispatch(signInSuccess(data));
      navigate('/');

    } catch (error) {
      console.log("could not log in with google",error)
    }
  }
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white rounded-lg uppercase hover:opacity-80 p-3'>
      Continue with Google
    </button>
  )
}

export default OAuth
