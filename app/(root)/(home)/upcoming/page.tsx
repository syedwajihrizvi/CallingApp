import CallList from '@/components/CallList'
import React from 'react'

const Upcoming = () => {
  return (
    <section className='flex size-full flex-col'>
      <CallList type="upcoming"/>
    </section>
  )
}

export default Upcoming