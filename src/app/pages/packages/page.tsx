'use client'
import Header from '@/app/component/ui/Navbar/NavBar'
import Packages from '@/app/component/ui/Packages/Packages'
import { SessionProvider, useSession } from 'next-auth/react'
import React from 'react'

export default function page() {
  return (
    <div>
      <Packages/>
    </div>
  )
}
