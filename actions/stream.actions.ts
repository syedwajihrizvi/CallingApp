"use server"
import { StreamClient } from '@stream-io/node-sdk'
import { currentUser } from "@clerk/nextjs/server";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY

export const tokenProvider = async () => {
    const user = await currentUser()
    if (!user) throw new Error('User is not authenticated')
    if (!apiKey) throw new Error('No API key')
    if (!apiSecret) throw new Error('No API secret')

    const streamClient = new StreamClient(apiKey, apiSecret)
    const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000)
    const exp = currentTimeInSeconds + 60 * 60
    const issued = currentTimeInSeconds
    return streamClient.generateUserToken({user_id: user.id, validity_in_seconds: exp - issued, exp: exp, issued_at: issued})
}