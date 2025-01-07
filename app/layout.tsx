import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import "@stream-io/video-react-sdk/dist/css/styles.css";

import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cally",
  description: "Video calling app",
  icons: {
    icon: '/icons/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <ClerkProvider 
          appearance={{
          layout: {
            logoImageUrl: '/icons/logo.png'
          },
          variables: {
            colorBackground: '#1C1F2E',
            colorText: 'white',
            colorPrimary: '#0E78F9',
            colorInputBackground: '#252a41',
            colorInputText: 'white'
          }
        }}>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-2`}>
              {children}
              <Toaster/>
          </body>
      </ClerkProvider>
    </html>
  );
}
