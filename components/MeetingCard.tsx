import { Call, CallRecording } from '@stream-io/video-react-sdk'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

const avatars = [
    'avatar-1.jpeg',
    'avatar-2.jpeg',
    'avatar-3.png',
    'avatar-4.png',
    'avatar-5.png',
    'avatar-1.jpeg',
    'avatar-2.jpeg',
    'avatar-3.png',
    'avatar-4.png',
    'avatar-5.png',
    'avatar-1.jpeg',
    'avatar-2.jpeg',
    'avatar-3.png',
    'avatar-4.png',
    'avatar-5.png'
]
const MeetingCard = ({type, meeting}: {type: string, meeting: Call | CallRecording}) => {
  
  const router = useRouter()
  const displayIcon = 
    type == 'upcoming' ? '/icons/upcoming.svg' : 
            (type == 'previous' ? '/icons/previous.svg': 
                                    '/icons/recordings.svg')
   
  const RenderButtons = () => {
        const { toast } = useToast()
        switch (type) {
            case 'upcoming':
                return (
                    <div className='flex gap-2'>
                        <Button className='bg-customBlue font-semibold px-8 py-2'
                                onClick={() => {
                                    router.push(`/meeting/${(meeting as Call).id}`)
                                }}>
                            Start
                        </Button>
                        <Button className='bg-dark-2 font-semibold'
                                onClick={() => {
                                    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`)
                                    toast({title: 'Link copied'})
                                }}>
                            <Image src="icons/copy.svg" width={15} height={15} alt="Copy Invitation"/>
                            Copy Invitation
                        </Button>
                    </div>                
                )
            case 'previous':
                return null
            default:
                return (
                    <div className='flex justify-between items-center w-full gap-5'>
                        <Button className='bg-customBlue font-semibold px-8 py-2 w-full'
                                onClick={() => router.push((meeting as CallRecording).url)}>
                            <Image src='/icons/play.svg' width={20} height={20} alt="Play Recording"/>
                            Start
                        </Button>
                        <Button className='bg-dark-2 font-semibold w-full' 
                                onClick={() => {
                                    navigator.clipboard.writeText((meeting as CallRecording).url)
                                    toast({title: 'Link copied'})
                                }}>
                            <Image src="icons/share.svg" width={15} height={15} alt="Copy Invitation"/>
                            Share
                        </Button>
                    </div> 
                ) 
        }
    }

  const RenderInfo = () => {
    return (type == 'upcoming' || type == 'previous' ? 
            <>
                <h1 className='text-white font-bold text-2xl'>
                    {(meeting as Call).state.custom.title}
                </h1>
                <h3 className='text-white'>{(meeting as Call).state.startsAt?.toLocaleString()}</h3>
                <p className='text-white'>
                {(meeting as Call).state.custom.description}
                </p>
            </> : 
            <>
                 <h1 className='text-white font-bold text-2xl'>#f23cv1d</h1>
                 <h3 className='text-white'>
                    Start Time: <span className='font-semibold'>{(meeting as CallRecording).start_time?.toLocaleString()}</span>  
                    End Time: <span className='font-semibold'>{(meeting as CallRecording).end_time?.toLocaleString()}</span> </h3>               
            </>)
  }
  
  
  return (
    <div className='bg-dark-1 rounded-lg py-2 px-3 flex flex-col gap-4'>
        <div className='flex flex-col'>
            <Image src={displayIcon} width={20} height={20} alt="Calender Icon" className='mb-3'/>
            <RenderInfo/>
        </div>
        <div className='flex justify-between items-center'>
            {type == 'upcoming' || type == 'previous' ? 
            <div className='flex h-[25px] items-center'>
                {avatars.slice(0, 5).map(pic => (
                    <Image key={pic} src={`/images/${pic}`} width={30} height={30} className='rounded-full -ml-2' alt={`Avatar-${pic}`}/>
                ))}
                <div className='text-white bg-dark-2 rounded-full inline-flex 
                                    items-center justify-center w-[35px] h-[35px] p-1 -ml-2'>
                    +{avatars.length - 5}
                </div>
            </div> : null}
            <RenderButtons/>
        </div>
    </div>
  )
}

export default MeetingCard