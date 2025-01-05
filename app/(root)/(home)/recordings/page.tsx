import CallList from '@/components/CallList'
import React from 'react'

const Recordings = () => {
  return (
    <section className='flex size-full flex-col'>
      <h3 className='text-white font-semibold'>Recordings</h3>
      <CallList type='recordings'/>
    </section>
  )
}

export default Recordings