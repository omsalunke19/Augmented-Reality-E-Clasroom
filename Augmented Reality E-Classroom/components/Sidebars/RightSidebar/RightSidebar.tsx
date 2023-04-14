import { auth } from '@/firebaseConfig'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import ProfileCard from './ProfileCard'

const RightSidebar = () => {

  const router = useRouter()


  if (router.pathname == "/subject/[subject]/lesson/[lessonID]") return null

  return (
    // <div className='hidden lg:col-start-11 lg:col-end-13 bg-Lightest border-l border-gray-300'>
    //   <ProfileCard />
    // </div>

    <>
    </>
  )
}

export default RightSidebar