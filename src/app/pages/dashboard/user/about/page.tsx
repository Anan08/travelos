'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function page() {
  const session = useSession()
  return (
    <div>
      <h1>name: {session.data?.user?.name}</h1>
      <h1>email: {session.data?.user?.email}</h1>
    </div>
  )
}
