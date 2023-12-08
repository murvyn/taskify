import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from './api/auth/authOptions'
import { redirect } from 'next/navigation'

const Home = async () => {
  const session = await getServerSession(authOptions) 
  if(!session) redirect("/login")
  return (
    <div className='btn btn-error' >logout</div>
  )
}

export default Home