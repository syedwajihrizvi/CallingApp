import Image from 'next/image'
import React from 'react'

const MeetingType = ({bgColor, icon, heading, subTitle: subtitle, handleClick}: 
                     {bgColor: string, icon: string, heading: string, 
                      subTitle: string,handleClick: () => void}) => {
  return (
    <div className={`${bgColor} w-full min-h-[270px] rounded-xl
                        flex flex-col justify-between py-6 pl-3 
                        cursor-pointer meeting`} onClick={handleClick}>
        <div className='p-1 bg-gray-100 w-fit rounded-md bg-opacity-30'>
            <Image src={icon} height={20} width={20} alt="Plus"/>
        </div>
        <div className='text-white'>
            <h3 className='font-extrabold'>{heading}</h3>
            <h5 className='text-sm'>{subtitle}</h5>
        </div>
    </div>
  )
}

export default MeetingType