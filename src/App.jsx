import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './components/page-signin/Login'
import Register from './components/page-signin/Regis'
import Main from './components/page-main/Main'
import Friend from './components/page-friends/src/Friend'
import "./components/page-signin/firebase"
import {getAuth, onAuthStateChanged} from 'firebase/auth'

export default function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  //component lifecycle
  useEffect(()=>{
    const auth = getAuth()
    onAuthStateChanged(auth, (result)=>{
      if(result){
        setIsLogin(true);
        setLoading(false);
        return;
      }

      setIsLogin(false);
      setLoading(false);
    })
  },[])

    if(loading){
      return(
        <div className=' w-screen h-screen flex flex-col justify-center items-center'>Loading...</div>
      )
    }
  return (
    <>
      {isLogin? (<Routes>
      <Route path='/main' element = {<Main/>} />
      <Route path='*' element = {<Main/>} />
      <Route path="/friend" element={<Friend/>}/>
    </Routes>) : (
      <Routes>
      <Route path='/' element = {<Login />} />
      <Route path='/register' element = {<Register />} />
      <Route path='/*' element = {<Register />} />
    </Routes>
    )}
    </>
  )
}
