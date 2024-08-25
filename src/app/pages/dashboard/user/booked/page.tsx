'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import QRCode from 'qrcode.react';

interface PackageTransaction {
  id: string;
  userId: string;
  packageId: string;
  packageName: string;
  amount: number;
  prices: number;
  status: string;
  code: string;
}

export const ModalQR = ( {bookCode, onClose}:{bookCode : any, onClose : () => void} ) => {
  return(
    <div className="z-10 p-10 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded justify-center items-center flex">
        <QRCode value={bookCode} size={248} />
        <button
          onClick={onClose}
          className="m-10 text-white p-6 w-36 h-12 justify-center items-center pb-12 bg-blue-600 rounded "
        >
          Close QR
        </button>
      </div>
    </div>
)

}

export default function Page() {
  const session = useSession();
  const email = session.data?.user?.email
  const [userBook, setUserBook] = useState<PackageTransaction[]>([])
  const [modal, setModal] = useState(false)
  const [selectedCode, setSelectedCode] = useState<string | null>(null)

  console.log(email)
  useEffect(() => {
    if (email) {
      fetch(`/api/user?userId=${email}`,{
        method: 'GET',
      }).then((response) => {
        return response.json()
      }).then((data) => {
          setUserBook(data)
      })
    }
  }, [email]);
  console.log(userBook)

  const handleQRCode = (bookCode : string ) => {
    setModal(true)
    setSelectedCode(bookCode)
}


  return (
    <div>
      {modal && <ModalQR
      bookCode={selectedCode}
      onClose = {() => setModal(false)}
      
      />}
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
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Amount</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">QR</th>
                </tr>
              </thead>
              <tbody>
                {userBook.map((book) => (
                  <tr key={book.id} className="border-t border-gray-200">
                    <td className="py-2 px-4">{book.packageName}</td>
                    <td className="py-2 px-4">{book.amount}</td>
                    <td className="py-2 px-4">${book.prices}</td>
                    <td className="py-2 px-4">
                      <span className={`${book.status === 'verified' ? 'text-green-500' : 'text-red-500'}`}>
                        {book.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">{
                      book.status === 'verified' ? (
                      <button 
                      className="px-2 py-1 text-sm text-blue-600 border border-blue-600 rounded"
                      onClick={() => {handleQRCode(book.code)}}>
                        Show QR
                      </button>
                    ) : (<span>Not Verified</span>) }</td>
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
