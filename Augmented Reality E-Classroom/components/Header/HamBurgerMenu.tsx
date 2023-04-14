import { auth } from '@/firebaseConfig'
import { SignInWithGoogleFunction } from '@/utils/SignInWithGoogle'
import { signOut } from 'firebase/auth'
import Image from 'next/image'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx"


import { BsPerson } from "react-icons/bs"
import { MdOutlineLeaderboard, MdSubject } from "react-icons/md"
import { CgPerformance } from "react-icons/cg"
import { IoSettingsOutline } from "react-icons/io5"
import { IoMdNotificationsOutline } from "react-icons/io"
import Link from 'next/link'


interface IProps {
    isHamBurgerMenuVisible: boolean
    setIsHamBurgerMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const navLinks = [
    {
        id: 0,
        name: "Subjects",
        icon: <MdSubject size={"1.5rem"} className="text-white" />,
        link: "/"
    },
    {
        id: 1,
        name: "Leaderboard",
        icon: <MdOutlineLeaderboard size={"1.5rem"} className="text-white" />,
        link: "/leaderboard"
    },
    {
        id: 2,
        name: "Performance",
        icon: <CgPerformance size={"1.5rem"} className="text-white" />,
        link: "/"
    },
    {
        id: 3,
        name: "Profile",
        icon: <BsPerson size={"1.5rem"} className="text-white" />,
        link: "/"
    },
    {
        id: 4,
        name: "Notifications",
        icon: <IoMdNotificationsOutline size={"1.5rem"} className="text-white" />,
        link: "/"

    }

]

const HamBurgerMenu = ({ isHamBurgerMenuVisible, setIsHamBurgerMenuVisible }: IProps) => {

    const [user, loading, error] = useAuthState(auth)

    return (
        <div className={`fixed top-0 left-0 h-full w-[100%] bg-Brand flex flex-col items-start justify-between ${isHamBurgerMenuVisible ? "translate-x-0" : "translate-x-full"} ease-in-out duration-500`}>

            <div className='w-full flex flex-col justify-start items-center px-4 py-4'>
                <div className='w-full flex justify-start items-center space-x-2'>
                    {!isHamBurgerMenuVisible ? (
                        <div className='flex justify-center items-center w-10 h-10 bg-Darkest rounded-full '>
                            <RxHamburgerMenu className='w-6 h-6 text-white  hover:cursor-pointer' onClick={() => setIsHamBurgerMenuVisible(!isHamBurgerMenuVisible)} />
                        </div>
                    ) : (
                        <div className='flex justify-center items-center w-10 h-10 rounded-full bg-Darkest'>
                            <RxCross1 className='w-6 h-6 text-white  hover:cursor-pointer' onClick={() => setIsHamBurgerMenuVisible(!isHamBurgerMenuVisible)} />
                        </div>
                    )}


                    {/* Profile card */}
                    <div className='flex lg:flex-1 w-full h-20 justify-center items-center px-3'>
                        {!user && (
                            <button
                                onClick={() => {
                                    SignInWithGoogleFunction()
                                    setIsHamBurgerMenuVisible(false)
                                }}
                                type='button'
                                title='signIn'
                                className='flex outline-none border-none w-28 h-10 bg-Dark text-Brand font-nunito font-semibold text-base rounded-md justify-center items-center'>
                                Sign in
                            </button>
                        )}


                        {user && (
                            <div onClick={() => {
                                signOut(auth)
                                setIsHamBurgerMenuVisible(false)
                            }} className='flex justify-center items-center space-x-2 hover:cursor-pointer'>
                                <Image src={user?.photoURL as string} alt="pfp" width={50} height={50} className={"w-8 h-8 sm:w-10 sm:h-10 aspect-square rounded-full"} />
                                <p className='inline-block font-nunito text-base font-semibold'> {user?.displayName} </p>
                            </div>
                        )}
                    </div>
                </div>

                <>
                    <div className='w-full flex flex-col items-center justify-start space-y-20'>
                        {navLinks?.map((item) => {
                            return (
                                <Link
                                    onClick={() => setIsHamBurgerMenuVisible(false)}
                                    key={item.id}
                                    href={item.link}
                                    className='w-full flex justify-start items-center space-x-3 px-5 py-1 hover:cursor-pointer'>
                                    {item.icon}
                                    <h6 className='text-base text-white font-nunito font-medium'> {item.name} </h6>
                                </Link>
                            )
                        })}
                    </div>

                </>
            </div>

        </div>
    )
}

export default HamBurgerMenu