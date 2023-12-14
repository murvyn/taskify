import Link from 'next/link';
import React from 'react'
import { FaHome, FaCheck, FaClipboard } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";

const SidebarLinks = () => {
  return (
    <div className='w-full'>
         <Link href='/' className='border-r-4 hover:border-r-info btn btn-ghost rounded-none flex justify-center items-center space-x-5'>
          <FaHome />
          <p>Home</p>
        </Link>
        <Link href='/' className='btn btn-ghost rounded-none flex justify-center items-center space-x-5'>
          <FaListCheck />
          <p>Home</p>
        </Link>
        <Link href='/' className='btn btn-ghost rounded-none flex justify-center items-center space-x-5'>
          <FaCheck />
          <p>Home</p>
        </Link>
        <Link href='/' className='btn btn-ghost rounded-none flex justify-center items-center space-x-5'>
          <FaClipboard />
          <p>Home</p>
        </Link>
    </div>
  )
}

export default SidebarLinks