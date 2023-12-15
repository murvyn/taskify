'use client'
import Image from 'next/image'
import React from 'react'
import SidebarLinks from './SidebarLinks'
import noUser from '@/public/no-user.jpg'
import { LuLogOut } from "react-icons/lu"
import { signOut } from 'next-auth/react';

const SecondSide = ({show}: {show: boolean}) => {
    const handle = async () => {
        await signOut()
      }
  return (
    <div className={`max-sm:${show ? 'inline fixed w-full h-full z-40 top-0 left-0 ' : 'hidden'} sm:hidden card bg-base-200 sm:${`w-[15rem] h-[96vh]  flex items-center justify-between py-5`} border border-stone-700 bg-base-300 `}>
        <div className='flex flex-col xl:flex-row justify-around gap-4 items-center my-5 max-sm:flex-row sm:px-4' >
          <Image src={noUser} width={60} height={60} alt='image' className='rounded-full object-cover' />
          <span className='text-xl font-bold text-center  xl:text-left max-sm:text-left cursor-pointer inline-block -sm:hidden '>Marvin <br /> Asamoah</span>
        </div>
        <SidebarLinks show={show} />
        <div>
          <button className='btn btn-ghost rounded-none text-xl' onClick={handle}>
            <LuLogOut className='text-primary' />
            <span className='-sm:hidden'>
              logout
            </span>
          </button>

        </div>
      </div>
  )
}

export default SecondSide