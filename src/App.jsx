import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './components/page-signin/Login'
import Register from './components/page-signin/Regis'
import Main from './components/page-main/Main'
import Friend from './components/page-friends/src/Friend'

export default function App() {
  return (
    <Routes>
      <Route path='/' element = {<Login />} />
      <Route path='/register' element = {<Register />} />
      <Route path='/main' element = {<Main/>} />
      <Route path="/friend" element={<Friend/>}/>
    </Routes>
  )
}
