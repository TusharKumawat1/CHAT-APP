import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ChatWindow from './components/ChatWindow'
import Home from './components/Home'
import { ToastContainer } from 'react-toastify'
import Utilfunc from './context/Utilfunc'
export default function App() {
  return (
    <Utilfunc>
    <div className='container'>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/chats/' element={<ChatWindow />} />
          <Route path='/chats/:userId' element={<ChatWindow />} />
          <Route path='*' element={<h1>Not Found</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </Utilfunc>
  )
}
