import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Regis'
import Main from '../../page-main/Main'

export default function App() {
  return (
    <Routes>
      <Route path='/' element = {<Login />} />
      <Route path='/register' element = {<Register />} />
      <Route path='/dashboard' element = {<Main/>} />
    </Routes>
  )
}
