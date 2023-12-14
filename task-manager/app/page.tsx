
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from './api/auth/authOptions'
import { redirect } from 'next/navigation'
import { FaPlus, FaEdit } from "react-icons/fa"
import { IoTrashBin } from "react-icons/io5"
import TaskCard from '@/components/TaskCard'



const Home = async () => {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")
  return (
    <>
      <div className='card w-full h-[96vh] bg-base-200 border border-stone-700 shadow-2xl p-5 overflow-hidden hover:overflow-y-scroll'>
        <div className=''>
          <TaskCard />
        </div>
      </div>
    </>
  )
}

export default Home