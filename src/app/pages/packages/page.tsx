'use client'
import Header from '@/app/component/ui/NavBar'
import Packages from '@/app/component/ui/Packages'
import { SessionProvider, useSession } from 'next-auth/react'
import React from 'react'

export default function page() {
  const session = useSession();
  console.log(session)
  return (
    <SessionProvider>
      <div>
          <div>
              <Packages/>
          </div>
      </div>
    </SessionProvider>
  )
}
