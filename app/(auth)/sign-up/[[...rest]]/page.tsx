"use client"
import { SignUp } from '@clerk/nextjs'
import React, { useEffect } from 'react'

const SignUpPage = () => {
  useEffect(() => {
    const usernameField = document.documentElement.querySelector('.cl-input__username')
    console.log(usernameField)
  }, [])

  return (
    <main className='flex w-full h-screen items-center justify-center'>
      <SignUp appearance={{
        elements: {
          username: {
            placeholder: "Enter your desired username",
          },
        },
      }}/>
    </main>
  )
}

export default SignUpPage