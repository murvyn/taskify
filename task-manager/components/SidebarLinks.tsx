import Link from 'next/link';
import React from 'react'
import { FaHome, FaCheck, FaClipboard } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";

const SidebarLinks = () => {
  return (
    <div className='w-full'>
         <Link href='/dashboard/tasks' className='border-r-4 hover:border-r-primary btn btn-ghost rounded-none flex justify-center items-center space-x-5'>
          <FaHome />
          <p>All Tasks</p>
        </Link>
        <Link href='/' className='border-r-4 hover:border-r-primary btn btn-ghost rounded-none flex justify-center items-center space-x-5'>
          <FaListCheck />
          <p>Important</p>
        </Link>
        <Link href='/' className='border-r-4 hover:border-r-primary btn btn-ghost rounded-none flex justify-center items-center space-x-5'>
          <FaCheck />
          <p>Completed</p>
        </Link>
        <Link href='/' className='border-r-4 hover:border-r-primary btn btn-ghost rounded-none flex justify-center items-center space-x-5'>
          <FaClipboard />
          <p>Do it Now</p>
        </Link>
    </div>
  )
}

export default SidebarLinks