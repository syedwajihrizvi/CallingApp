import { useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { BsCameraVideoFill, BsCameraVideoOffFill } from "react-icons/bs";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

const MeetingSetup = ({setIsSetUpComplete}: {setIsSetUpComplete: (complete: boolean) => void}) => {
  const [isMicCamToggledIn, setIsMicToggledIn] = useState({camera: false, mic: false})
  const call = useCall()
  const router = useRouter()
  if (!call) throw new Error('useCall must be used within StreamCall component')

  const handleCameraToggle = async () => {
    if (isMicCamToggledIn.camera) {
      setIsMicToggledIn({...isMicCamToggledIn, camera: false})
      call.camera.disable()
    } else {
      setIsMicToggledIn({...isMicCamToggledIn, camera: true})
      call.camera.enable()
    }
  }

  const handleMicToggle = () => {
    if (isMicCamToggledIn.mic) {
      setIsMicToggledIn({...isMicCamToggledIn, mic: false})
      call.microphone.disable()
    } else {
      setIsMicToggledIn({...isMicCamToggledIn, mic: true})
      call.microphone.enable()
    }
  }

  return (
    <div className='w-full h-screen flex flex-col 
                    items-center
                    px-2'>
      <h1 className='text-2xl text-white font-bold mb-5'>Setup</h1>
      {isMicCamToggledIn.camera ?
      <div className='flex items-center justify-center h-fit'>
        <VideoPreview className='h-full w-full' />
      </div> : 
      <div className='bg-black h-[600px] w-full'/>}
      <div className="flex flex-row justify-center gap-40 mt-5 bg-white rounded-lg px-2 py-1">
        {!isMicCamToggledIn.camera ? 
          <BsCameraVideoFill className='size-10' onClick={handleCameraToggle} cursor='pointer'/> : 
          <BsCameraVideoOffFill className='size-10' onClick={handleCameraToggle} cursor='pointer'/>}
        {!isMicCamToggledIn.mic ? 
          <FaMicrophone className='size-10' onClick={handleMicToggle} cursor='pointer'/> : 
          <FaMicrophoneSlash className='size-10' onClick={handleMicToggle} cursor='pointer'/>}
      </div>
      <div className="flex gap-4">
        <Button className='rounded-md bg-green-500 px-6 py-2 text-2xl mt-4' onClick={() => { 
          call.join()
          setIsSetUpComplete(true)
        }}>
          Join
        </Button>
        <Button className='rounded-md bg-red-500 px-6 py-2 text-2xl mt-4' onClick={() => { 
          router.back()
        }}>
          Leave
        </Button>
      </div>
    </div>
  )
}

export default MeetingSetup