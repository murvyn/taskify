'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

const page = () => {
  const handle =async () => {
    await signOut()
  }
  return (
    <div className='btn btn-error' onClick={handle}>logout</div>
  )
}

export default page