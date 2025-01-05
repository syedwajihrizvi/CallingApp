'use client'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import React from 'react'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useRouter } from 'next/navigation'

const Table = ({title, description}: {title: string, description: string}) => {
  return (
    <div className='flex flex-col items-start gap-2'>
      <h1 className='text-2xl font-bold text-sky-100 lg:text-3xl xl:min-w-32'>{title}</h1>
      <h1 className='text-sm text-sky-50 font-semibold truncate max-sm:max-w-[320px] lg:text-xl'>{description}</h1>
    </div>
  )
}

const Personal = () => {
  const {user, isLoaded} = useUser()
  const client = useStreamVideoClient()
  const meetingId = user?.id
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`
  const { call }  = useGetCallById(meetingId!)
  const router = useRouter()
  const { toast}  = useToast()

  const startRoom = async () => {
    if (!client || !user) return 
    
    if (!call) {
      console.log("Creating new meeting")
      const newCall = client?.call('default', meetingId!)
      const startsAt = new Date(Date.now()).toISOString()
      await newCall.getOrCreate({
        data: {
          starts_at: startsAt,
        }
      })
    }
    router.push(`/meeting/${meetingId}?personal=true`)

  }

  return !isLoaded ? <Loader/>:
    (
      <section className='flex size-full flex-col'>
        <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
          <Table title="Topic" description={`${user?.firstName} ${user?.lastName}'s Meeting Room`}/>
          <Table title="Meeeting ID" description={`${meetingId}`}/>
          <Table title="Invite Link" description={meetingLink}/>
        </div>
        <div className='flex gap-5 mt-5'>
          <Button className='bg-customBlue' onClick={startRoom}>
            Start Meeting
          </Button>
          <Button className='bg-dark-1' onClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast({title: 'Link Copied!'})

          }}>
            Copy Invitation
          </Button>
        </div>
      </section>
    )
}

export default Personal