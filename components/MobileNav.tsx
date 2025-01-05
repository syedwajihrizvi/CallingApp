'use client'
import Image from 'next/image'
import { toggler, logo, sidebarLinks } from '@/constants'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const MobileNav = () => {
  const pathname = usePathname()
  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
            <SheetTrigger asChild>
                <Image src={toggler} width={35} height={35} alt="Toggler" className='cursor-pointer'/>
            </SheetTrigger>
            <SheetContent className='bg-dark-1 border-none' side="left">
                <SheetHeader>
                <SheetTitle>
                <Link href='/' className='flex items-center gap-1'>
                    <Image src={logo} height={32} width={32} alt="Logo"/>
                    <p className='text-[26px] text-white font-semibold'>Yoom</p>
                </Link>
                </SheetTitle>
                </SheetHeader>
                <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
                        <section className="flex h-full flex-col gap-6 pt-16">
                        {sidebarLinks.map(link => {
                            const isActive = pathname == link.route
                            return (
                                <SheetClose asChild key={link.label}>
                                    <Link href={link.route}
                                        className={cn('flex py-1 px-2 rounded-lg gap-4', {'bg-blue': isActive})}>
                                        <Image src={link.imgUrl} height={20} width={20} alt='Logo'/>
                                        <p className='font-semibold text-md text-white'>{link.label}</p>
                                    </Link>
                                </SheetClose>
                            )
                        })}
                        </section>
                </div>
            </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNav