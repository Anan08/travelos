'use client'
import { useEffect, useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Pagination from '../Pagination/Pagination'

const includedFeatures = [
  'Hotels',
  'Bus',
  'Flights',
  'Goodies',
]

interface dataProps {
  id:string,
  title:string,
  desc:string,
  prices:number
}

const UserBook = ({ title, desc, price, onClose }: { title: string|undefined, desc: string|undefined, price: number|undefined, onClose: () => void }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p>{desc}</p>
        <p className="mt-4 font-bold">Price: ${price}</p>
        <div className="mt-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            min="1"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}


export default function Packages() {
  const router = useRouter();

  const session = useSession();
  const [data, setData] = useState<dataProps[]>([]);
  const email = session.data?.user?.email;
  const [modal, setModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<dataProps | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [quantity, setQuantity] = useState(0);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = data.slice(firstPostIndex, lastPostIndex)

  useEffect(() => {
      
    fetch('/api/packages', {
        method: 'GET'
      }).then((data) => {
        return data.json()
      }).then((response) => {
        setData(response.data)
      })
  }, [])

  const handleBooking = (email: any, selectedPackage : any) => {

    if (session.data == null) {
      return alert('you need to login')
    }

    if(confirm('are you sure you want to buy this?')) {
        setModal(true);
        fetch(`/api/bookings?uid=${email}&packageId=${selectedPackage.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify ({
            packageId: selectedPackage.id,
            uid: email,
          })
        })
        alert('succesfully bought the item')
        router.push('/')
    } else {
      return
    }

    
    
  }

  console.log(session)
  return (
    <div className=" py-24 sm:py-32">
      {modal && <UserBook
      title={selectedPackage?.title}
      desc={selectedPackage?.desc}
      price={selectedPackage?.prices}
      onClose={() => setModal(false)}/>}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Travel Packages</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Can&apos;t choose? why dont we choose for yourself.
          </p>
        </div>
        {currentPost.map((pkg) => {
          return (
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none" 
            id={pkg.id}
            key={pkg.id}>
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">{pkg.title}</h3>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  {pkg.desc}
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What&apos;s included</h4>
                  <div className="h-px flex-auto bg-gray-100" />
                </div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                >
                  {includedFeatures.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-indigo-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-gray-600">Start your journey</p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">${pkg.prices}</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                    </p>
                    <button
                        onClick={() => handleBooking(email, pkg.id)}
                        className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Bookings
                      </button>
                    <p className="mt-6 text-xs leading-5 text-gray-600">
                        Invoices and receipts available for easy company reimbursement
                    </p>
                  </div>
                </div>
              </div>
            </div>
           )
        })}
      </div>
      <Pagination
      postsPerPage={postsPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPosts={data.length}/>
    </div>
  )
}
