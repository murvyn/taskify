'use client'
import { signOut } from 'next-auth/react';
import SidebarLinks from './SidebarLinks';
import Image from 'next/image';
import noUser from '@/public/no-user.jpg'
import { LuLogOut } from "react-icons/lu"



const SideBar = () => {
  const handle = async () => {
    await signOut()
  }
  return (
    <div className='container'>
      <div className="card bg-primary w-[15rem] h-[90vh] flex items-center justify-between">
        <div className='flex justify-around gap-4 items-center my-5' >
          <Image src={noUser} width={60} height={60} alt='image' className='rounded-full object-cover'  />
          <span className='text-xl font-bold'>Marvin <br/> Asamoah</span>
        </div>
        <SidebarLinks />
        <div>
      <button className='btn btn-ghost rounded-none text-xl' onClick={handle}>
        <LuLogOut />
        logout</button>

        </div>
      </div>
    </div>
  )
}

export default SideBar