'use client'

import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall } from '@stream-io/video-react-sdk'
import { StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

const Meeting = ({params}: {params: Promise<{id: string}>}) => {
  const {id: meetingId} = React.use(params)
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const { call, isCallLoading } = useGetCallById(meetingId)

  return (
    <main className='h-screen w-full'>
      {!isCallLoading ? 
        <StreamCall call={call}>
          <StreamTheme>
            {!isSetupComplete ? 
            <MeetingSetup setIsSetUpComplete={setIsSetupComplete}/> : 
            <MeetingRoom/>}
          </StreamTheme>
        </StreamCall> :
        <Loader/>}
    </main>
  )
}

export default Meeting