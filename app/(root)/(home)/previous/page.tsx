import CallList from '@/components/CallList'
import React from 'react'

const Previous = () => {
  return (
    <section className='flex size-full flex-col'>
      <h3 className='text-white font-semibold'>Previous</h3>
      <CallList type="previous"/>
    </section>
  )
}

export default Previous