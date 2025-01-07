'use client'
import { joinMeetingViaLink, plus, recordings, scheduleMeetingIcon } from '@/constants'
import MeetingType from './MeetingType'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from '@/hooks/use-toast'

const MeetingTypesList = () => {
  const router = useRouter()
  const { user } = useUser()
  const client = useStreamVideoClient()
  const [values, setValues] = useState(
    { 
      dateTime: new Date(),
      title: '',
      description: '', 
      link: ''
    })
  const [meetingType, setMeetingType] = useState<
    'newMeeting' | 'joinMeeting' | 
    'scheduleMeeting' | 'meetingRecordings' 
    | undefined>()
  const [callDetails, setCallDetails] = useState<Call>()
  const { toast } = useToast()

  const clickRecordings = () => {
    console.log("Click Recordings")
    router.push('/recordings')
  }

  const createMeeting = async () => {
    if (!client || !user) return
    try {
      if (!values.dateTime) {
        toast({
          title: 'Please select a date and a time'
        })
        return 
      }
      const callId = crypto.randomUUID()
      const call = client.call('default', callId)
      if (!call) throw new Error('Failed to create call')
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || 'Instant Meeting'
      const title = values.title || `Meeting by ${user.fullName}`
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
            title
          }
        }
      })
      setCallDetails(call)

      if (!values.description) {
        router.push(`/meeting/${callId}`)
      }
      toast({
        title: 'Meeting Created'
      })
    } catch (error) {
      console.log(error)
      toast({
        title: 'Meeting setup error',
      })
    }
  }

  const joinMeeting = () => {
    console.log("Join Meeting")
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
  return (
    <div>
        <section className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 mt-6'>
            <MeetingType bgColor='bg-customGreen' 
                         icon={joinMeetingViaLink} heading="New Meeting" 
                        subTitle="Start an instant meeting"
                        handleClick={() => setMeetingType('newMeeting')}/>
            <MeetingType bgColor='bg-customRed' 
                        icon={plus} heading="Join Meeting" 
                        subTitle='Via invitation link'
                        handleClick={() => setMeetingType('joinMeeting')}/>
            <MeetingType bgColor='bg-customBlue-100' 
                        icon={scheduleMeetingIcon} heading="Schedule Meeting"
                        subTitle="Plan your meeting" 
                        handleClick={() => setMeetingType('scheduleMeeting')}/>
            <MeetingType bgColor="bg-customYellow"
                        icon={recordings} heading="View Recordings"
                        subTitle="Meeting recordings" 
                        handleClick={clickRecordings}/>
        </section>
        <MeetingModal isOpen={meetingType == "newMeeting"}
                      onClose={() => setMeetingType(undefined)}
                      title="Start an Instant Meeting"
                      className='text-center'
                      buttonText='Start Meeting'
                      handleClick={createMeeting}/>
        
        <MeetingModal isOpen={meetingType == "joinMeeting"}
                      onClose={() => setMeetingType(undefined)}
                      title="Via an invitation link "
                      className='text-center'
                      buttonText='Start Meeting'
                      handleClick={joinMeeting}/>
        {!callDetails ?
                <MeetingModal isOpen={meetingType == "scheduleMeeting"}
                onClose={() => setMeetingType(undefined)}
                title="Create Meeting"
                handleClick={createMeeting}>
                  <div className='flex flex-col gap-2.5'>
                    <label className='text-base text-normal leading-[22px] text-sky-200'>
                      Meeting Title
                    </label>
                    <Textarea 
                      className='bg-dark-2 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-lg p-1'
                      onChange={(e) => setValues({...values, title: e.target.value})}/>
                  </div>
                  <div className='flex flex-col gap-2.5'>
                    <label className='text-base text-normal leading-[22px] text-sky-200'>
                      Add a description
                    </label>
                    <Textarea 
                      className='bg-dark-2 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-lg p-1'
                      onChange={(e) => setValues({...values, description: e.target.value})}/>
                  </div>
                  <div className="flex flex-col gap-2 5">
                  <label className='text-base text-normal leading-[22px] text-sky-200'>
                      Choose a date
                    </label>
                    <DatePicker selected={values.dateTime} 
                                onChange={(date) => setValues({...values, dateTime: date as Date})}
                                className='w-full bg-dark-2 px-2 py-1 rounded-md' 
                                showTimeSelect={true}
                                timeFormat='HH:mm'
                                timeIntervals={15}
                                timeCaption='time'
                                dateFormat='MMMM d, yyyy h:mm aa'/>
                  </div>
                </MeetingModal> :
                <MeetingModal isOpen={meetingType == "scheduleMeeting"}
                onClose={() => setMeetingType(undefined)}
                title="Meeting Created"
                handleClick={() => {
                  navigator.clipboard.writeText(meetingLink)
                  toast({title: 'Link copied'})
                  console.log("Click clicked for copy meeting")
                }}
                image='/icons/checked.svg'
                buttonIcon='/icons/copy.svg'
                buttonText='Copy Meeting Link'/>
        }
        <MeetingModal isOpen={meetingType == "meetingRecordings"}
                      onClose={() => setMeetingType(undefined)}
                      title="View Recordings"
                      className='text-center'
                      buttonText='Meeting recordings'
                      handleClick={clickRecordings}/>
        <MeetingModal isOpen={meetingType == "joinMeeting"}
                      onClose={() => setMeetingType(undefined)}
                      title="Join a Meeting via link"
                      className='text-center'
                      buttonText='Join Meeting'
                      handleClick={() => router.push(values.link)}>
              <label>Enter meeting link here</label>
              <Input onChange={(event) => setValues({...values, link: event.target.value})}
                      placeholder='Meeting Link'/>           
          </MeetingModal>
    </div>
  )
}

export default MeetingTypesList