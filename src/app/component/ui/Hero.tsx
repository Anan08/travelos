'use client'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Hotels', href: '#' },
  { name: 'Flights', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Hero() {

  return (

    <div className="bg-white flex pt-36 items-center justify-center">
      <div className='justify-center'>
        <h1 className='font-extrabold text-4xl text-gray-800'>From Asia to the World</h1>
        <h1 className='font-light text-xl text-gray-500'>From Asia to the World, All yours!</h1>
      </div>
    </div>
  )
}
