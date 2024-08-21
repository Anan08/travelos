'use client'
import Header from '@/app/component/ui/Navbar/NavBar'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function page() {
  return (
    <div className="mx-auto max-w-2xl sm:text-center pt-32">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Our Partners</h2>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        We&apos;ve Partnered with.
      </p>
  </div>
    
  )
}
