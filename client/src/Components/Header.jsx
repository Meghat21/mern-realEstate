import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';

function Header() {
  const navigate=useNavigate()
  const {currentUser}=useSelector(state=>state.user);
  const [searchTerm,SetSearchTerm]=useState('')
  console.log('user is',currentUser)

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const urlParams=new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);

    const searchQuery=urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    console.log(urlParams)
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      SetSearchTerm(searchTermFromUrl);
    }
    console.log(location.search)
  }, [location.search]);

  return (
    <header className='bg-slate-200 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
      <Link to='/'>
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-slate-500'>Usee</span>
        <span className='text-slate-700'>Estate</span>
      </h1>
      </Link>
      <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
        <input type="text" name="" id="" placeholder='Search' className='bg-transparent focus:outline-none w-24 sm:w-64' onChange={(e)=>SetSearchTerm(e.target.value)}/>
        <button type='submit'>
        <FaSearch className='text-slate-600'/>
        </button>
      </form>
      {/* menu */}
      <ul className='flex gap-4'> 
      <Link to='/'>
        <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
      </Link>
      <Link to={'/about'}>
        <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
      </Link>
      
      <Link to={'/profile'}>
        {currentUser ? (
          <img src={currentUser.photo} alt={currentUser.username} className='rounded h-7 w-7 object-cover'/>
        ):(
        <li className='sm:inline text-slate-700 hover:underline'>Sign in</li>
        )}
      </Link>
      {/* <Link to={'/sign-up'}>
        <li className='sm:inline text-slate-700 hover:underline'>Sign up</li>
      </Link> */}

      </ul>
    </div>
    </header>
  )
}

export default Header
