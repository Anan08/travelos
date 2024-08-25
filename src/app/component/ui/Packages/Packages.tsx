'use client'
import { useEffect, useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Pagination from '../Pagination/Pagination'
import randomIdGenerator from '@/app/lib/randomStringGenerator'


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

const UserBook = ({onClose, data, email} : { onClose :  () => void, data: dataProps | any, email : any})   => {
  const [amount, setAmount] = useState(1);
  const mail = email
  const packageId = data.id;
  const packageTitle = data.title;
  const packagePrices = data.prices * amount
  const code = randomIdGenerator();

  console.log(mail, packageId, packageTitle, packagePrices, code, amount)
  const saveHandler = () => {
    if (confirm('save the data?')) {
        fetch(`/api/bookings`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
          packageId : packageId,
          prices : packagePrices,
          userId : mail,
          packageName : packageTitle,
          code : code,
          amount : amount,
        })
      }) 
      
      return alert('item successfully saved');
    } else {
      return alert('canceled');
    }
  }

  return (
  <div className="fixed inset-0 z-10 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-75 p-64 mt-16 overflow-scroll">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Package Information</h2>
        <label className="block mb-2 text-lg font-bold">
          Title:
          <p className='text-md font-light p-2'>{data.title}</p>
        </label>
        <label className="block mb-2 text-lg font-bold">
          Description:
          <p className='text-md font-light p-2'>{data.desc}</p>
        </label>
        <label className="block mb-4 text-lg font-bold">
          Price:
          <p className='text-md font-light p-2'>${data.prices}</p>
        </label>
        <label className="block mb-4 text-lg font-bold">
          Amount:
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
            className="w-full mt-1 p-2 border rounded font-light"
          />
        </label>
        <h1>amount : ${data.prices * amount}</h1>
        <button onClick={() => {
          saveHandler()
          onClose()
          }} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
          Save
        </button>
        <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
          Cancel
        </button>
      </div>
    </div>
  );
}


export default function Packages() {

  const session = useSession();
  const [data, setData] = useState<dataProps[]>([]);
  const email = session.data?.user?.email;
  const [modal, setModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<dataProps>();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [quantity, setQuantity] = useState(0);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = data.slice(firstPostIndex, lastPostIndex)

  const handleBooking = () => {

    if (session.data == null) {
      return alert('you need to login')
    }

    if(confirm('are you sure you want to buy this?')) {
        setModal(true);
        
    } else {
      return alert('Canceled')
    }

  }

  const packageSelector = (pkgId : any) => {
    const selected =  data.find((pkg) => pkg.id === pkgId );
    if (selected) {
      setSelectedPackage(selected);
    } else {
      return alert('package not found')
    }
  }

  useEffect(() => {
      
    fetch('/api/packages', {
        method: 'GET'
      }).then((data) => {
        return data.json()
      }).then((response) => {
        setData(response.data)
      })
  }, [])

  
  console.log(session)
  return (
    <div className=" py-24 sm:py-32">
      {modal && <UserBook 
      onClose={() => setModal(false)}
      data={selectedPackage}
      email={email}/>}
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
                        onClick={() => {
                          packageSelector(pkg.id);
                          handleBooking()
                        }}
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
