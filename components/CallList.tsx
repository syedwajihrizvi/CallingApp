'use client'

import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard'
import Loader from './Loader'

const CallList = ({type}: {type: 'previous' | 'upcoming' | 'recordings'}) => {
  const {endedCalls, upcomingCalls, recordings: callRecordings, isLoading} = useGetCalls()
  const [recordings, setRecordings] = useState<CallRecording[]>([])
  
  const getCalls = () => {
    switch (type) {
      case 'previous':
        return endedCalls
      case 'upcoming':
        return upcomingCalls
      case 'recordings':
        return recordings
      default:
        return [];
    }
  }

  const getNoCallsMessage = () => {
    switch (type) {
      case 'previous':
        return 'No Previous Calls'
      case 'upcoming':
        return 'No Upcoming Calls'
      case 'recordings':
        return 'No Recordings'
      default:
        return '';
    }
  }

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(callRecordings!.map((meeting) => meeting.queryRecordings()))
      const recordings = callData.filter(call => call.recordings.length > 0).flatMap(call => call.recordings)
      console.log(recordings)
      setRecordings(recordings)
    }
    if (type === 'recordings') fetchRecordings()
  }, [type, callRecordings])

  const calls = getCalls()
  const noCallsMessage = getNoCallsMessage()

  if (isLoading) return <Loader/>

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording, index) => (
        <MeetingCard key={index} type={type} meeting={meeting}/>
      )) : <h1 className='text-white text-lg'>{noCallsMessage}</h1>}
    </div>
  )
}

export default CallList