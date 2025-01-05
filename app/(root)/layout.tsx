import React, { ReactNode } from 'react'
import StreamVideoProvider from './providers/StreamClientProvider'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Yoom",
  description: "Video calling app",
  icons: {
    icon: '/icons/logo.svg'
  }
};

const RootLayout = ({ children}: {children: ReactNode}) => {
  return (
    <StreamVideoProvider>
      <main>
        {children}
      </main>
    </StreamVideoProvider>
  )
}

export default RootLayout