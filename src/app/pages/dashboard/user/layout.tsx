import React, { ReactNode } from 'react'
import Link from 'next/link'
import { signOut, auth } from '../../../../../auth'

export default async function layout({children} : {
    children:React.ReactNode
}) {
    const session = await auth()
    console.log(session)

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
                    <form onSubmit={async() => {
                        "use server"
                        await signOut()
                    }}>
                        <button type='submit' className="text-white hover:text-gray-400">Sign Out</button>
                    </form>
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
