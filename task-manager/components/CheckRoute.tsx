'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import SideBar from './SideBar'

const CheckRoute = () => {
    const route = usePathname()
    if(route === '/login' || route === '/sign-up'){
      return <></>
    }
  return (
    <SideBar />
  )
}

export default CheckRoute