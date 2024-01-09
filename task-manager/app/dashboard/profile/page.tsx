import UserProfile from '@/components/UserProfile'
import React, { Suspense } from 'react'
import Loading from '../../loading'

const Profile = () => {
  return (
    <>
    <div>
      <h2 className="card-title mb-5 w-auto flex flex-col items-start ">
        Profile
        <span className=" w-1/12 h-1 bg-primary"></span>
      </h2>
      <Suspense fallback={<Loading />}>
        <UserProfile />
      </Suspense>
    </div>
  </>
  )
}

export default Profile