import Link from 'next/link';
import React from 'react'
import { FaHome, FaCheck, FaClipboard } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";

const SidebarLinks = ({ show }: { show: boolean }) => {
  return (
    <div className='w-full'>
      <div className={`${show && 'tooltip  hover:tooltip-open tooltip-primary tooltip-right'} w-full`} data-tip='All Tasks' >
        <Link href='/' className={`border-r-4 hover:border-r-primary btn btn-ghost rounded-none flex justify-center items-center space-x-5  sm:${show && 'w-[5rem]'} `}>
          <FaHome />
          <p className={`sm:${show && 'hidden'}`}>All Tasks</p>
        </Link>
      </div>
      <div className={`${show && 'tooltip  hover:tooltip-open tooltip-primary tooltip-right'} w-full`} data-tip='Important' >
        <Link href='/' className={`border-r-4 hover:border-r-primary btn btn-ghost rounded-none flex justify-center items-center space-x-5  sm:${show && 'w-[5rem]'} `}>
          <FaListCheck />
          <p className={`sm:${show && 'hidden'}`}>Important</p>
        </Link>
      </div>
      <div className={`${show && 'tooltip  hover:tooltip-open tooltip-primary tooltip-right'} w-full`} data-tip='Completed' >
        <Link href='/' className={`border-r-4 hover:border-r-primary btn btn-ghost rounded-none flex justify-center items-center space-x-5  sm:${show && 'w-[5rem]'} `}>
          <FaCheck />
          <p className={`sm:${show && 'hidden'}`}>Completed</p>
        </Link>
      </div>
      <div className={`${show && 'tooltip  hover:tooltip-open tooltip-primary tooltip-right'} w-full`} data-tip='Do it Now' >
        <Link href='/' className={`border-r-4 hover:border-r-primary btn btn-ghost rounded-none flex justify-center items-center space-x-5  sm:${show && 'w-[5rem]'} `}>
          <FaClipboard />
          <p className={`sm:${show && 'hidden'}`}>Do it Now</p>
        </Link>
      </div>
    </div>
  )
}

export default SidebarLinks