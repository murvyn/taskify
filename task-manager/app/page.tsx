import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from './api/auth/authOptions'
import { redirect } from 'next/navigation'
import SideBar from '@/components/SideBar'

const Home = async () => {
  const session = await getServerSession(authOptions) 
  if(!session) redirect("/login")
  return (
    <>
    <div className='container p-5'>

    <SideBar />
    </div>
    </>
  )
}

export default Home