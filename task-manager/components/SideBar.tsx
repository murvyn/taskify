import React from 'react'
import { FaHome, FaCheck, FaClipboard } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";


const SideBar = () => {
  return (
    <div className='container'>
      <div className="card bg-primary w-[15vw] h-[90vh]">
        <div className='flex justify-between items-center px-20'>
          <FaHome />
          <p>Home</p>
        </div>
        <div className='flex justify-between items-center px-20'>
          <FaListCheck />
          <p>Home</p>
        </div>
        <div className='flex justify-between items-center px-20'>
          <FaCheck />
          <p>Home</p>
        </div>
        <div className='flex justify-between items-center px-20'>
          <FaClipboard />
          <p>Home</p>
        </div>
      </div>
    </div>
  )
}

export default SideBar