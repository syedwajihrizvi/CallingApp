import React from 'react'
import Moment from 'moment'
import MeetingTypesList from '@/components/MeetingTypesList'

const Home = () => {
  const moment = Moment()
  return (
    <section className='flex size-full flex-col'>
      <div className='h-[300px] w-full bg-hero bg-cover'>
        <div className='flex flex-col justify-between h-full py-6 pl-5'>
          <span className='text-white bg-gray-600 w-fit rounded-xl text-sm px-2 py-1'>Upcoming Meeting at 12 PM</span>
          <div>
            <h2 className='text-white text-7xl font-bold'>
              {moment.format('h:mm')}<span className='text-[1rem] ml-2 uppercase'>{moment.format('a')}</span>
            </h2>
            <h4 className='text-white opacity-70 text-md'>{moment.format('dddd')}, {moment.format("MMM Do YYYY")}</h4>
          </div>
        </div>
      </div>
      <MeetingTypesList/>
    </section>
  )
}

export default Home