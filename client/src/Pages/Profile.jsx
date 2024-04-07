import React from 'react'
import {useSelector} from 'react-redux'

function Profile() {
  const {currentUser}= useSelector(state => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.data.photo} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <input type="text" defaultValue={currentUser.data.username} name="" id="username" placeholder='username' className='border p-3 rounded-lg'/>
        <input type="text" defaultValue={currentUser.data.email} name="" id="email" placeholder='email' className='border p-3 rounded-lg'/>
        <input type="text" name="" id="password" placeholder='password' className='border p-3 rounded-lg'/>

        <button type='button' className='bg-slate-700 text-white uppercase rounded-lg p-3 hover:opacity-80 disabled:opacity-70'>Update</button>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>

      </div>
    </div>
  )
}

export default Profile
