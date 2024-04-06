import { useState } from 'react'
import './App.css'
import './index.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Singin from './Pages/Signin'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'
import Header from './Components/Header'
import Footer from './Components/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/sign-in' element={<Singin/>}/>
        <Route path='/sign-up' element={<Signup/>}/>

      </Routes>
      <Footer/>

    </BrowserRouter>
  )
}

export default App
