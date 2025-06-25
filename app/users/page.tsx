'use client'
import React from 'react'
import { useSession } from '../session-context'

export default function page() {
    const session= useSession()
    const id=session.userId;
  return (
    
    <div className='flex flex-col gap-10 text-center p-10'>
      <h1 className='font-bold'>user's ID</h1>
    <div>{id}</div>
    </div>
  )
}
