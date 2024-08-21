'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

interface userBookProps {
  id: string,
  packageId: string,
  userId: string,
}

export default function page() {
  const session = useSession();
  const email = session.data?.user?.email
  const [userBook, setUserBook] = useState<userBookProps[]>([])

  useEffect(() => {
    fetch(`/api/user?uid=${email}`,{
      method: 'GET'
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if(Array.isArray(data)) {
        setUserBook(data)
      } else {
        setUserBook([]);
      }
    })
  }, []);


  
  const handleEdit = (id: string) => {
    return id;
  };

  const handleDelete = (id: string) => {
    return id;
  };
  return (
    <div>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Package List</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">This will be used for CRUD function on package data</p>
        </div>

        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900 mb-10"> Package list</h2>
          <div className="p-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-2 px-4 text-left">Id</th>
                  <th className="py-2 px-4 text-left">Package Id</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userBook.map((pkg) => (
                  <tr key={pkg.id} className="border-t border-gray-200">
                    <td className="py-2 px-4">{pkg.id}</td>
                    <td className="py-2 px-4">${pkg.userId}</td>
                    <td className="py-2 px-4">
                      <button
                        className="mr-2 px-2 py-1 text-sm text-blue-600 border border-blue-600 rounded"
                        onClick={() => handleEdit(pkg.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 text-sm text-red-600 border border-red-600 rounded"
                        onClick={() => handleDelete(pkg.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
