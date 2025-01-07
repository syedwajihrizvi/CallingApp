import React, { ReactNode } from 'react'
import StreamVideoProvider from './providers/StreamClientProvider'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cally",
  description: "Video calling app",
  icons: {
    icon: '/icons/logo.png'
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