'use client'
import { sidebarLinks } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import { cn } from '@/lib/utils'

const Sidebar = () => {
  const pathname = usePathname()
  return (
    <section className='sticky left-0 top-0 
                        flex h-screen w-fit flex-col 
                        justify-between bg-dark-1 
                        text-white max-sm:hidden lg:w-[264px]
                        px-6 pt-20'>
        <div className='flex flex-col gap-6'>
            {sidebarLinks.map(link => {
                const isActive = pathname == link.route
                return (
                    <Link href={link.route} key={link.label}
                          className={cn('flex py-1 px-2 rounded-lg gap-4', {'bg-blue': isActive})}>
                        <Image src={link.imgUrl} height={20} width={20} alt='Logo'/>
                        <p className='font-semibold text-md text-white max-md:hidden'>{link.label}</p>
                    </Link>
                )
            })}
        </div>
    </section>
  )
}

export default Sidebar