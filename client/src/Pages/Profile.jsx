import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import {updateInFailure,updateInStart,updateInSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutUserFailure,signOutUserStart,signOutUserSuccess} from '../redux/userSlice'
import {useNavigate} from 'react-router-dom'

function Profile() {
  const fileRef=useRef(null);
  const {currentUser,loading,error}= useSelector(state => state.user)
  const [file,setFile]=useState(undefined);
  const [filepercentage,setfilepercentage]=useState(0);
  const [fileerro,setFileerro]=useState(false);
  const[formData,setFormData]=useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false);
  console.log(filepercentage)
  console.log(formData)
  const dispatch = useDispatch();
  const navigate=useNavigate();
  
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateInStart());
      const res = await fetch(`/app/v1/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateInFailure(data.message));
        return;
      }

      dispatch(updateInSuccess(data));
      setUpdateSuccess(true);
      navigate('/profile')
    } catch (error) {
      dispatch(updateInFailure(error.message));
    }
  };
  
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/app/v1/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/sign-up');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignoutUser =async()=>{
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/app/v1/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }
  return (

    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e)=>{setFile(e.target.files[0])}} type="file" hidden name="fileId" id="fileId" ref={fileRef} accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={formData.photo || currentUser.photo} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>

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

        <input onChange={handleChange} type="text" defaultValue={currentUser.username} name="" id="username" placeholder='username' className='border p-3 rounded-lg'/>
        <input onChange={handleChange} type="text" defaultValue={currentUser.email} name="" id="email" placeholder='email' className='border p-3 rounded-lg'/>
        <input onChange={handleChange} type="password" name="" id="password" placeholder='password' className='border p-3 rounded-lg'/>

        <button disabled={loading} type='submit' className='bg-slate-700 text-white uppercase rounded-lg p-3 hover:opacity-80 disabled:opacity-70'>{loading ? 'Loading ... ': 'Update'}</button>
      </form>

      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignoutUser} className='text-red-700 cursor-pointer'>Sign out</span>

      </div>
      <p className='text-red-700 mt-3'>{error ? error : ''}</p>
      <p className='text-green-500 mt-3'>{updateSuccess ? "User updated successfully" : ''}</p>
    </div>
  )
}

export default Profile
