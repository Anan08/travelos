'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface dataProps {
  id:string,
  status:string,
  prices:number,
  amount:number,
  packageName:string,
  userId:string,
}


export default function Page() {
  const router = useRouter()
  const [transaction, setTransaction] = useState<dataProps[]>([]);
  const [modal, setModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<dataProps | null | undefined>(null)


  useEffect(() => {
    
    fetch('/api/transaction', {
        method: 'GET'
      }).then((response) => {
        return response.json()
      }).then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTransaction(data)
        } else {
          setTransaction([])
        }
        
        console.log(data)}
      )
  }, [])

  const handleDelete = (id : string) => {
    if (confirm('delete the item?')) {
        fetch(`/api/package?id=${id}`, {
          method: 'DELETE'
      })
      alert('successfully deleted the item')
      router.push('/pages/dashboard/admin/packages')
      
    } else {
      return
    }
    
  };

  const handleStatusChange = (id : string, newStatus : string) => {
  };


  return (
    <div>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Package List</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">This will be used for CRUD function on package data</p>
        </div>

        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900 mb-10"> Transaction list</h2>
          <div className="p-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Prices</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">User</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transaction.map((transaction) => (
                  <tr key={transaction.id} className="border-t border-gray-200">
                    <td className="py-2 px-4">{transaction.packageName}</td>
                    <td className="py-2 px-4">${transaction.prices}</td>
                    <td className="py-2 px-4">
                      <span className={`${transaction.status === 'verified' ? 'text-green-500' : 'text-red-500'}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">{transaction.userId}</td>
                    <td className="py-2 px-4">
                      <select
                        value={transaction.status}
                        onChange={(e) => {}}
                        className="border rounded px-2 py-1"
                      >
                        <option value="unverified">Unverified</option>
                        <option value="verified">Verified</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
