'use client'
import React, { ReactNode } from 'react'
import Link from 'next/link'
import { signOut } from '../../../../../auth'
import { handleSignOut } from '@/app/lib/useAuth'
import { redirect, useRouter } from 'next/navigation'

export default function layout({children} : {
    children:React.ReactNode
}) {

    const signOutHandler = () => {
        if (confirm('sign out?')) {
            handleSignOut()
        } else {
            return
        }
    }
  return (
    <div>
        <div className="flex h-screen">
            <aside className="w-64 bg-gray-800 text-white p-6 gap-7 h-full">
                <ul className=''>
                <li className="p-4" >
                    <Link href="/pages/dashboard/user/booked" className="text-white hover:text-gray-400">Booked</Link>
                </li>
                <li className="p-4">
                    <Link href="/pages/dashboard/user/about" className="text-white hover:text-gray-400">About</Link>
                </li>
                <li className="p-4">
                    <button onClick={signOutHandler} className="text-white hover:text-gray-400">Sign Out</button>
                </li>
                </ul>
            </aside>
            <div className="flex-grow p-6 bg-gray-100">
                {children}
            </div>    
        </div>
        
    </div>
    
  )
}
