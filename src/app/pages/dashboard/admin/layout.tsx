import React, { ReactNode } from 'react'
import Link from 'next/link'

export default function layout({children} : {
    children:React.ReactNode
}) {
  return (
    <div>
        <div className="flex h-screen">
            <aside className="w-64 bg-gray-800 text-white p-6 gap-7 h-full">
                <ul className=''>
                <li className="p-4" >
                    <Link href="/pages/dashboard/admin/addPackage" className="text-white hover:text-gray-400">Add Package</Link>
                </li>
                <li className="p-4" >
                    <Link href="/pages/dashboard/admin/packages" className="text-white hover:text-gray-400">Package List</Link>
                </li>
                <li className="p-4" >
                    <Link href="/pages/dashboard/admin/transaction" className="text-white hover:text-gray-400">Transaction List</Link>
                </li>
                <li className="p-4">
                    <a href="#" className="text-white hover:text-gray-400">Settings</a>
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
