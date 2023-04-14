import React, { useState, useRef } from 'react'
import Image from 'next/image'
import logoOne from "../../../public/images/logos/logoOne.png"
import Link from 'next/link'

// Icons Import
import { BsPerson } from "react-icons/bs"
import { MdOutlineLeaderboard, MdSubject } from "react-icons/md"
import { CgPerformance } from "react-icons/cg"
import { IoSettingsOutline } from "react-icons/io5"
import { IoMdNotificationsOutline } from "react-icons/io"
import { useRouter } from 'next/router'
import ProfileCard from '../RightSidebar/ProfileCard'

const navLinks = [
    {
        id: 0,
        name: "Subjects",
        icon: <MdSubject size={"1.5rem"} className="text-gray-600" />,
        link: "/"
    },
    {
        id: 1,
        name: "Leaderboard",
        icon: <MdOutlineLeaderboard size={"1.5rem"} className="text-gray-600" />,
        link: "/leaderboard"
    },
    {
        id: 2,
        name: "Performance",
        icon: <CgPerformance size={"1.5rem"} className="text-gray-600" />,
        link: "/"
    },
    {
        id: 3,
        name: "Profile",
        icon: <BsPerson size={"1.5rem"} className="text-gray-600" />,
        link: "/"
    },
    {
        id: 4,
        name: "Notifications",
        icon: <IoMdNotificationsOutline size={"1.5rem"} className="text-gray-600" />,
        link: "/"

    }

]


const LeftSidebar = () => {
    const router = useRouter()
    const [isProfileCardOpen, setIsProfileCardOpen] = useState<boolean>(false)

    const profileCardContainerRef = useRef<HTMLDivElement | null>(null)
    const profileCardRef = useRef<HTMLDivElement | null>(null)


    if (router.pathname == "/subject/[subject]/lesson/[lessonID]") return null

    return (
        <>
            {isProfileCardOpen && (
                <div
                    ref={profileCardContainerRef}
                    className='fixed w-full h-full bg-black/[.80] flex justify-center items-center' onClick={(e) => {
                        // console.log(e.target)
                        if (e.target !== profileCardRef.current) setIsProfileCardOpen(false)
                    }}>
                    <div ref={profileCardRef} className='z-50 w-[90%] h-[50vh] sm:w-[60%] md:w-[40%] lg:w-[30%] lg:h-[40vh] bg-Lightest rounded-md flex flex-col items-center justify-start'>

                    </div>
                </div>
            )}


            <div className='hidden lg:inline-flex col-start-1 col-end-3 bg-Lightest flex-col items-center justify-between py-10 space-y-10 border-r border-gray-300'>
                {/* LOGO */}
                <Link href={`/`}>
                    <Image
                        src={logoOne}
                        alt="logo"
                        width={100}
                        height={100}
                        className="w-20 h-20"
                    />
                </Link>

                {router.pathname !== "/subject/[subject]/lesson/[lessonID]" && (
                    <>
                        <div className='w-full flex flex-col items-center justify-start space-y-20'>
                            {navLinks?.map((item) => {
                                return (
                                    <Link
                                        onClick={() => {
                                            if (item.name === "Profile") setIsProfileCardOpen(true)
                                        }}
                                        key={item.id}
                                        href={item.link}
                                        className='w-full flex justify-start items-center space-x-3 px-5 py-1 hover:cursor-pointer'>
                                        {item.icon}
                                        <h6 className='text-base text-gray-600 font-nunito font-medium'> {item.name} </h6>
                                    </Link>
                                )
                            })}
                        </div>


                        <div
                            className='w-full flex justify-start items-center space-x-3 px-5 py-1 hover:cursor-pointer' onClick={() => console.log(router)}>
                            <IoSettingsOutline size={"1.5rem"} className="text-gray-600" />
                            <h6 className='text-base text-gray-600 font-nunito font-medium'> Settings </h6>
                        </div>

                    </>
                )}

            </div >
        </>
    )
}

export default LeftSidebar