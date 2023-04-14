import { useRouter } from 'next/router'
import React from 'react'

const Index = () => {
    const router = useRouter()
    const {subject} = router.query
  return (
    <div>
        {subject}
    </div>
  )
}

export default Index