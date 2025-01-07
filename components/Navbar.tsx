import Image from 'next/image'
import React from 'react'
import { logo } from '@/constants'
import Link from 'next/link'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex w-full items-center justify-between px-2 py-2 fixed z-50 bg-dark-1 lg:px-10'>
        <Link href='/' className='flex items-center gap-1'>
            <Image src={logo} height={32} width={32} alt="Logo" className='max-sm:size-10'/>
            <p className='text-[26px] text-white font-semibold max-sm:hidden'>Cally</p>
        </Link>
        <div className='flex justify-center items-center gap-2'>
            <SignedIn>
              <UserButton/>
            </SignedIn>
            <div className='hidden max-md:inline-block'>
                <MobileNav/>
            </div>
        </div>
    </nav>
  )
}

export default Navbar