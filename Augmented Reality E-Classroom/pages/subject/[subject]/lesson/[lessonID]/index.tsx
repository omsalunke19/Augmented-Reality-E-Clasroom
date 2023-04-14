import React, { useEffect, useState } from 'react'
import { auth, db } from '@/firebaseConfig'
import { arrayUnion, collection, doc, getDoc, getDocs, increment, updateDoc } from 'firebase/firestore'
import Image from 'next/image'
import { useRouter } from 'next/router'
import logoOne from "../../../../../public/images/logos/logoOne.png"
import Link from 'next/link'

import WaitEmoji from "../../../../../public/images/LessonOnBoarding/WaitEmoji.png"
import ClickOn3dModelsEmoji from "../../../../../public/images/LessonOnBoarding/ClickOn3dModelsEmoji.png"
import StartTestEmoji from "../../../../../public/images/LessonOnBoarding/StartTestEmoji.png"

// icons
import { IoCloseSharp } from "react-icons/io5"
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify'
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx'

const Index = ({ lessonData, lessonTestsData, lessonFirstTestQuestionsAndAnswersData }: any) => {
    const [user, loading, error] = useAuthState(auth)
    const router = useRouter()


    const [timer, setTimer] = useState<number>(100)
    const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false)
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
    const [optionChosen, setOptionChosen] = useState<string>("");
    const [score, setScore] = useState<number>(0)
    const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false)



    // Onboarding Screens
    const [isOnboardingModalVisible, setIsOnboardingModalVisible] = useState<boolean>(true)
    const [isOnboardingScreenOneVisible, setIsOnboardingScreenOneVisible] = useState<boolean>(true)
    const [isOnboardingScreenTwoVisible, setIsOnboardingScreenTwoVisible] = useState<boolean>(false)
    const [isOnboardingScreenThirdVisible, setIsOnboardingScreenThirdVisible] = useState<boolean>(false)

    const nextQuestion = () => {
        if (lessonFirstTestQuestionsAndAnswersData?.questions[currentQuestionNumber].answer == optionChosen) {
            setScore(score + 1);
            setTimer(100)
            setCurrentQuestionNumber(currentQuestionNumber + 1);
            setOptionChosen("")
        }

        setCurrentQuestionNumber(currentQuestionNumber + 1);
        setOptionChosen("")



    }
    const finishTest = async () => {
        if (lessonFirstTestQuestionsAndAnswersData?.questions[currentQuestionNumber].answer == optionChosen) {
            setScore(score + 1);
            setTimer(0)
        }

        setIsTestModalOpen(false)
        setTimer(0)
        setIsTestCompleted(true)



        // updating user and Sending Coins to user
        const userRef = doc(db, "users", auth?.currentUser?.uid as string)
        await updateDoc(userRef, {
            userCoins: increment(score * 50)
        })

        const notify = () => toast.success(`${score * 50} Coins Credited`, {
            position: "bottom-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        notify()

    }


    useEffect(() => {
        let timerIntervalFunc: any;

        timerIntervalFunc = setInterval(() => {
            if (isTestModalOpen && timer != 0) setTimer(timer - 1)
            if (isTestModalOpen && timer == 0) {
                if (currentQuestionNumber != lessonFirstTestQuestionsAndAnswersData?.questions.length - 1) {
                    setCurrentQuestionNumber(currentQuestionNumber + 1)
                    setTimer(100)
                }
            }
        }, 1000)

        return () => clearInterval(timerIntervalFunc)

    })

    useEffect(() => {
        if (!user && !loading) {
            router.push("/")
            const notify = () => toast.error(`First Sign in`, {
                position: "bottom-center",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            notify()
        }
    }, [loading])


    const [isHamBurgerMenuVisible, setIsHamBurgerMenuVisible] = useState<boolean>(false)

    return (
        <>
            {/* Header */}
            <div className='z-30 bg-Brand fixed top-0 left-0 right-0 w-full h-12 lg:hidden flex justify-start items-center px-2'>
                {/* Hamburger Icon */}
                {!isHamBurgerMenuVisible ? (
                    <RxHamburgerMenu className='lg:hidden w-6 h-6 text-white hover:cursor-pointer' onClick={() => setIsHamBurgerMenuVisible(!isHamBurgerMenuVisible)} />
                ) : (
                    <RxCross1 className='lg:hidden w-6 h-6 text-white hover:cursor-pointer' onClick={() => setIsHamBurgerMenuVisible(!isHamBurgerMenuVisible)} />
                )}
            </div>

            {/* Sidebar */}
            <div className={`z-40 fixed top-0 left-0 h-full w-[100%] bg-Brand flex flex-col items-start justify-between ${isHamBurgerMenuVisible ? "translate-x-0" : "translate-x-full"} ease-in-out duration-500`}>

                <div className='w-full h-full flex flex-col justify-between items-center p-4 '>
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
                    </div>

                    {!isTestCompleted && (
                        <button
                            onClick={() => {
                                console.log(lessonFirstTestQuestionsAndAnswersData)
                                setIsTestModalOpen(true)
                                setIsHamBurgerMenuVisible(false)
                            }}
                            type='button'
                            className='outline-none border-none w-28 h-10 bg-Dark text-white font-nunito font-medium text-base rounded-md'
                        > Start Test </button>
                    )}

                    {/* Results */}
                    {isTestCompleted && (
                        <div className='w-[95%] py-20 flex flex-col items-center justify-start p-3 space-y-2 my-5 border-2 border-whtie rounded-lg'>
                            <p className='font-nunito font-medium'> Results: </p>
                            <p className='text-3xl font-nunito text-Brand font-bold'> Marks : {score} </p>
                            <p className='text-xl font-nunito text-Darkest font-bold'> {score * 50} Coins Earned !!!! </p>

                            <button
                                onClick={() => router.push(`/`)}
                                type='button'
                                title='goToHome'
                                className='outline-none border-none w-32 h-10 bg-Dark text-white font-nunito font-medium text-base rounded-md'
                            > Go to Home </button>
                        </div>
                    )}


                    <span className='text-Dark font-nunito font-extrabold'> Science Verse </span>
                </div>

            </div>

            {isOnboardingModalVisible && (
                <div className='z-20 fixed w-full h-full bg-black/[.40] flex justify-center items-center'>
                    <div className='z-50 w-[70%] sm:w-[60%] md:w-[50%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%]  bg-Lightest rounded-md flex flex-col items-center justify-between text-center p-4 space-y-6'>

                        {isOnboardingScreenOneVisible && (
                            <>
                                <Image src={WaitEmoji} alt="wait-for-1-min-pls" width={100} height={100} className="w-32 h-32 rounded-full" />
                                <div className='w-full  flex flex-col items-center justify-center space-y-3'>
                                    <p className='text-2xl font-nunito font-semibold text-Brand'> Loading Metaverse can take 30-50 seconds, please wait </p>
                                    <p className='text-lg font-nunito font-semibold text-red-500'> Don't Close Tab or minimize {"<3"} </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsOnboardingScreenOneVisible(false)
                                        setIsOnboardingScreenTwoVisible(true)
                                    }}
                                    type='button'
                                    title='next'
                                    className='outline-none border-none w-28 h-10 bg-Brand text-white font-nunito font-semibold text-base rounded-md'
                                > Next </button>
                            </>
                        )}

                        {isOnboardingScreenTwoVisible && (
                            <>
                                <Image src={ClickOn3dModelsEmoji} alt="wait-for-1-min-pls" width={100} height={100} className="w-32 h-32 rounded-full" />
                                <div className='w-full  flex flex-col items-center justify-center space-y-3'>
                                    <p className='text-2xl font-nunito font-semibold text-Darkest'> Click on 3D Models to interact with them </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsOnboardingScreenTwoVisible(false)
                                        setIsOnboardingScreenThirdVisible(true)
                                    }}
                                    type='button'
                                    title='next'
                                    className='outline-none border-none w-28 h-10 bg-Brand text-white font-nunito font-semibold text-base rounded-md'
                                > Next </button>
                            </>
                        )}

                        {isOnboardingScreenThirdVisible && (
                            <>
                                <Image src={StartTestEmoji} alt="wait-for-1-min-pls" width={100} height={100} className="w-32 h-32 rounded-full" />
                                <div className='w-full  flex flex-col items-center justify-center space-y-3'>
                                    <p className='text-2xl font-nunito font-semibold text-Darkest'> Start Test / Quiz after exploring the metaverse </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsOnboardingScreenThirdVisible(false)
                                        setIsOnboardingModalVisible(false)
                                    }}
                                    type='button'
                                    title='next'
                                    className='outline-none border-none w-28 h-10 bg-Brand text-white font-nunito font-semibold text-base rounded-md'
                                > Start it </button>
                            </>
                        )}

                    </div>
                </div>
            )}


            {isTestModalOpen && (
                <div className='z-20 fixed w-full h-full bg-black/[.80] flex justify-center items-center'>
                    <div className='z-30 w-[90%] h-[80vh] lg:w-[80%] lg:h-[80vh] bg-Lightest rounded-md flex flex-col items-center justify-start overflow-x-hidden overflow-y-scroll'>
                        {/* --- Taskbar ---  */}
                        <div className='w-full h-16 flex justify-between items-center bg-Brand rounded-tr-md rounded-tl-md px-5'>
                            <span> {null} </span>
                            {/* Timer */}
                            <p className='text-xl text-white font-nunito font-semibold'> Timer : {`${timer} seconds`} </p>
                            <IoCloseSharp size={"1.5rem"} onClick={() => setIsTestModalOpen(false)} className="text-red-500 hover:cursor-pointer" />
                        </div>

                        {/* Container */}
                        <div className='w-full h-full flex flex-col items-center justify-between py-10'>
                            {/* Question and Options container */}
                            <div className='w-full flex flex-col justify-between items-center'>
                                <p className='text-Dark text-4xl font-nunito font-semibold text-center px-5'>  Question {currentQuestionNumber + 1} : {lessonFirstTestQuestionsAndAnswersData?.questions[currentQuestionNumber]?.prompt} </p>
                                {/*- option - {optionChosen} Score - {score} */}

                                {/* Options */}
                                <div className='w-full flex flex-col items-center justify-center space-y-3 my-10'>
                                    {lessonFirstTestQuestionsAndAnswersData?.questions[currentQuestionNumber]?.options?.map((option: any) => {
                                        return (
                                            <button
                                                onClick={() => {
                                                    setOptionChosen(option.option)
                                                }}
                                                type='button'
                                                title='option'
                                                key={option.optionValue}
                                                className={`w-[90%] h-12 text-center bg-gray-200 ${optionChosen == option.option && "border-4 border-Brand"} rounded-md`}>
                                                <span className='text-base text-black font-nunito_sans font-medium'> {option.option} - {option.optionValue} </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>


                            {/* Buttons */}
                            <div className='w-full flex items-center justify-center space-x-3'>
                                {currentQuestionNumber == lessonFirstTestQuestionsAndAnswersData?.questions.length - 1 ? (
                                    <button
                                        onClick={finishTest}
                                        type='button'
                                        title='submitBtn'
                                        className=' outline-none border-none w-28 h-10 bg-Brand text-white font-nunito font-semibold text-base rounded-md'>
                                        Submit
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            nextQuestion()
                                        }}
                                        type='button'
                                        title='next'
                                        className=' outline-none border-none w-28 h-10 bg-Brand text-white font-nunito font-semibold text-base rounded-md'>
                                        Next
                                    </button>
                                )}

                            </div>

                        </div>
                    </div>
                </div>
            )}

            <div className='hidden lg:inline-flex col-start-1 col-end-3 bg-Lightest flex-col items-center justify-start py-10 space-y-10 border-r border-gray-600'>
                <Link href={`/`}>
                    <Image
                        src={logoOne}
                        alt="logo"
                        width={100}
                        height={100}
                        className="w-20 h-20"
                    />
                </Link>

                {!isTestCompleted && (
                    <button
                        onClick={() => {
                            console.log(lessonFirstTestQuestionsAndAnswersData)
                            setIsTestModalOpen(true)
                        }}
                        type='button'
                        className='outline-none border-none w-28 h-10 bg-Brand text-white font-nunito font-medium text-base rounded-md'
                    > Start Test </button>
                )}

                {/* Results */}
                {isTestCompleted && (
                    <div className='w-[95%] py-20 flex flex-col items-center justify-start p-3 space-y-2 my-5 border-2 border-Brand rounded-lg'>
                        <p className='font-nunito font-medium'> Results: </p>
                        <p className='text-3xl font-nunito text-Brand font-bold'> Marks : {score} </p>
                        <p className='text-xl font-nunito text-Darkest font-bold'> {score * 50} Coins Earned !!!! </p>

                        <button
                            onClick={() => router.push(`/`)}
                            type='button'
                            title='goToHome'
                            className='outline-none border-none w-32 h-10 bg-Brand text-white font-nunito font-medium text-base rounded-md'
                        > Go to Home </button>
                    </div>
                )}


                {/* Lesson Deatils */}
                <div className='w-full flex flex-col items-start justify-start p-3 space-y-2 my-5'>
                    <p className='text-Dark text-xl font-nunito_sans font-semibold'> Lesson Details: </p>
                    <p className='text-Dark text-base font-nunito_sans font-medium'>{lessonData?.lessonDescription}</p>
                </div>




            </div>


            <main className='col-span-full relative lg:col-start-3 lg:col-end-13 flex flex-col items-center justify-start bg-Brand'>
                {lessonData?.lessonType === "3dModel" && <div className='absolute w-full col-span-full lg:col-start-3 lg:col-end-13 h-14 bg-Brand top-0 flex justify-start items-center px-5'>    </div>}



                {lessonData?.lessonType === "metaverse" && (
                    <iframe
                        width={"100%"}
                        className='w-full h-screen' id=""
                        src={lessonData.lessonMetaverseID}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; microphone; camera; display-capture; xr-spatial-tracking; xr;"
                        allowFullScreen
                    ></iframe>
                )}



                {lessonData.lessonType === "3dModel" && (
                    <iframe
                        width={"100%"}
                        className='w-full h-screen' id=""
                        src={lessonData.lessonMetaverseID}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; microphone; camera; display-capture; xr-spatial-tracking; xr;"
                        allowFullScreen
                    ></iframe>
                )}


                {/* <iframe width=820 height=460 id="iframe" src="" allow="autoplay; fullscreen"></iframe> */}




            </main>
        </>

    )
}

export default Index






export async function getServerSideProps({ params }: any) {
    const { subject, lessonID } = params

    const lessonRef = doc(db, "classes", "10", "subjects_2", `${subject}`, 'lessons_2', `${lessonID}`)
    const lessonRes = await getDoc(lessonRef)
    const lessonData = lessonRes.data() || null


    const lessonTestsCollectionRef = collection(db, "classes", "10", "subjects_2", `${subject}`, 'lessons_2', `${lessonID}`, "tests_2")
    const lessonTestsRes = await getDocs(lessonTestsCollectionRef)
    const lessonTestsData = lessonTestsRes?.docs?.map(doc => doc.data())

    const lessonFirstTestQuestionsAndAnswersRef = doc(db, "classes", "10", "subjects_2", `${subject}`, 'lessons_2', `${lessonID}`, "tests_2", `${lessonTestsData[0]?.testID}`)
    const lessonFirstTestQuestionsAndAnswersRes = await getDoc(lessonFirstTestQuestionsAndAnswersRef)
    const lessonFirstTestQuestionsAndAnswersData = lessonFirstTestQuestionsAndAnswersRes?.data() || null

    return {
        props: {
            lessonData,
            lessonTestsData,
            lessonFirstTestQuestionsAndAnswersData
        }
    }

}