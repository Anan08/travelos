'use client'
import Header from '@/app/component/ui/NavBar'
import { SessionProvider, useSession } from 'next-auth/react'
import React from 'react'

export default function page() {
  const session = useSession();
  console.log(session);
  return (
    <SessionProvider>
      <>
        <div className='p-6'>Partnership</div>

      </>
    </SessionProvider>
    
  )
}
