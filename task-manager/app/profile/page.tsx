import CardLoading from '@/components/CardLoading'
import UserProfile from '@/components/UserProfile'
import React, { Suspense } from 'react'

const Profile = () => {
  return (
    <>
    <div className="card w-full h-[96vh] bg-base-300 border border-stone-700 shadow-2xl p-5 overflow-hidden sm:hover:overflow-y-scroll max-sm:overflow-y-scroll">
      <h2 className="card-title mb-5 w-auto flex flex-col items-start ">
        Profile
        <span className=" w-1/12 h-1 bg-primary"></span>
      </h2>
      <Suspense fallback={<CardLoading />}>
        <UserProfile />
      </Suspense>
    </div>
  </>
  )
}

export default Profile