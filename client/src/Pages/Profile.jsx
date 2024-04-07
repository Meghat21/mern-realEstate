import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'

function Profile() {
  const fileRef=useRef(null);
  const {currentUser}= useSelector(state => state.user)
  const [file,setFile]=useState(undefined);
  const [filepercentage,setfilepercentage]=useState(0);
  const [fileerro,setFileerro]=useState(false);
  const[formData,setFormData]=useState({})
  console.log(filepercentage)
  console.log(formData)
  
  useEffect(()=>{
    if(file){
      handleFile(file);
    }
  },[file]);

  const handleFile=(file)=>{
    const storage=getStorage(app);
    const fileName=new Date().getTime() + file.name;
    const storageRef=ref(storage,fileName);

    const uploadTask=uploadBytesResumable(storageRef,file);
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setfilepercentage(progress.toFixed(0))
      },
      (error)=>{
        setFileerro(true)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadUrl)=>{
          setFormData({...formData,photo:downloadUrl})
        })
      }
    )
  }
  return (

    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form  className='flex flex-col gap-4'>
        <input onChange={(e)=>{setFile(e.target.files[0])}} type="file" hidden name="" id="" ref={fileRef} accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={formData.photo || currentUser.data.photo} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>

        <p className='text-sm self-center'>
         {fileerro ? (
            <span className='text-red-700 mt-3'>Error in Uploading image</span>
          ) : filepercentage > 0 && filepercentage < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filepercentage}%`}</span>
          ) : filepercentage === 100 ? (
            <span className='text-green-700'>Successfully uploaded</span>
          ): (
            ''
          )}
        </p>

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
