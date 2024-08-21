'use client'
import React, {useEffect, useState} from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { json } from 'stream/consumers'
import LoadingScreen from '@/app/component/ui/Loading/Loading'



export default function page() {
    const router = useRouter();
    const [desc, setDesc] = useState('');
    const [destination, setDestination] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e : any) => {
        e.preventDefault()
        if (confirm('Save data to database?')) {
          setLoading(true)
          fetch('/api/package', {
              method: 'POST',
              headers: {
                  'Content-Type' : 'application/json'
              },
              body: JSON.stringify({
                  destination,
                  prices:parseInt(price),
                  desc
              }),
          })
          alert('data successfully added')
          setDesc('')
          setDestination('')
          setPrice('')
          setLoading(false)
        } else {
          return router.push('/pages/dashboard/admin/addPackage')
        }
        
    }
    
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        {loading && <LoadingScreen/>}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Packages</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Package will be added into database
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Destination
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Destination : </span>
                  <input
                    id="destination"
                    name="destination"
                    type="text"
                    placeholder="try Europe..."
                    autoComplete="off"
                    value={destination}
                    onChange={(e) => {setDestination(e.target.value)}}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Price : </span>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="maybe $3000?"
                    autoComplete="off"
                    value={price}
                    onChange={(e) => {setPrice(e.target.value)}}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="desc"
                  name="desc"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                  value={desc}
                  onChange={(e) => {setDesc(e.target.value)}}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Add the package description</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
