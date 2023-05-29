import React from 'react'
import Sidebar from './src/components/Sidebar'
import Chat from './src/components/Chat'
import "./styles.scss"
import Navbar from '../navbar/Navbar'

const ChatApp = () => {
  return (
    <div className='home relative'>
      <div className="container mb-20">
        <Sidebar/>
        <Chat/>
      </div>
      <div className='fixed bottom-0 w-2/3 mb-3'>
        <Navbar />
      </div>
    </div>
  )
}

export default ChatApp