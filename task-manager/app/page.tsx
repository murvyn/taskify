
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
      <div className='w-full' >
        <TaskCard />
      </div>
    </>
  )
}

export default Home