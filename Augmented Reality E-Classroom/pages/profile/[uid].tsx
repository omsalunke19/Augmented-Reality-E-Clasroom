import { useRouter } from 'next/router'
import React from 'react'

const indexedDB = () => {
    const router = useRouter()
    const { uid }: any = router.query

    const getUserDetails = async () => {
        return null
    }

    return (
        <main>
            <h1> YOUR UID : {uid} </h1>

        </main>
    )
}

export default indexedDB