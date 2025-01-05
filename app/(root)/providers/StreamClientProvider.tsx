'use client'
import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export default function StreamVideoProvider({children}: {children: ReactNode}) {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>()
    const { user, isLoaded } = useUser()
    useEffect(() => {
        const initializeClient = async () => {
            if (!isLoaded || !user) return
            if (!apiKey) throw new Error('Stream API Key missing')
            
            const streamUser = {
                id: user?.id,
                name: user?.username || user?.id,
                image: user?.imageUrl
            }
            const token = await tokenProvider()
            console.log(token)
            const client = new StreamVideoClient({apiKey, user: streamUser, token})
            setVideoClient(client)
        }
        initializeClient()
    }, [user, isLoaded])

    if (!videoClient) return <Loader/>

    return (
    <StreamVideo client={videoClient}>
        {children}
    </StreamVideo>
  );
}
