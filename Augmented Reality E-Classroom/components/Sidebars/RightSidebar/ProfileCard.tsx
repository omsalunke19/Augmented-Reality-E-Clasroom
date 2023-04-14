"use client"

import { auth } from '@/firebaseConfig'
import { SignInWithGoogleFunction } from '@/utils/SignInWithGoogle'
import { signOut } from 'firebase/auth'
import Image from 'next/image'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const ProfileCard = () => {
    const [user, loading, error] = useAuthState(auth)



    return (
        <div className='hidden lg:inline-flex lg:flex-1 w-full h-20 justify-center items-center px-3'>
            {!user && (
                <button
                    onClick={SignInWithGoogleFunction}
                    type='button'
                    title='signIn'
                    className='hidden lg:inline-flex outline-none border-none w-28 h-10 bg-Brand text-white font-nunito font-semibold text-base rounded-md justify-center items-center'>
                    Sign in
                </button>
            )}


            {user && (
                <div onClick={() => signOut(auth)} className='flex justify-center items-center space-x-2 hover:cursor-pointer'>
                    <Image src={user?.photoURL as string} alt="pfp" width={50} height={50} className={"w-8 h-8 sm:w-10 sm:h-10 aspect-square rounded-full"} />
                    <p className='hidden sm:inline-block font-nunito text-base font-semibold'> {user?.displayName} </p>
                </div>
            )}
        </div>
    )
}

export default ProfileCard