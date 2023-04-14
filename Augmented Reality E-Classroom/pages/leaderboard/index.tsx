import Header from '@/components/Header/Header'
import { db } from '@/firebaseConfig'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import React from 'react'

const Index = ({ leaderboardData }: any) => {
    return (
        <main className='bg-Lightest col-span-full lg:col-start-3 lg:col-end-13 flex flex-col items-center justify-start px-10'>
            <Header />

            <div className='w-full flex flex-col justify-start items-center space-y-3'>
                <h2 className='text-4xl text-Dark font-nunito font-semibold'> Leaderboard </h2>
                {leaderboardData[0] && leaderboardData?.map((userData: any) => {
                    return (
                        <div key={userData?.userID} className="flex justify-start items-center space-x-4 px-5 py-2 rounded-md bg-gray-100">
                            <h4 className='text-lg text-Dark font-nunito font-medium'> {userData?.userName} </h4>
                            <span className='text-lg text-Brand font-nunito font-medium'> {userData?.userCoins} Coins </span>
                        </div>
                    )
                })}
            </div>

        </main>
    )
}

export default Index



export const getServerSideProps = async () => {
    const usersQuery = query(collection(db, "users"), orderBy("userCoins", "desc"))
    const leaderboardQuery = await getDocs(usersQuery)
    const leaderboardData: any[] = leaderboardQuery?.docs?.map((doc: any) => {
        return doc.data()
    })


    return {
        props: {
            leaderboardData
        }
    }

}