import Link from 'next/link';
import { auth, signIn, signOut } from '../../../../../auth';

import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
// import Avatar from './Avatar'

const products = [
  { name: 'Package', description: 'Choose package to buy', types: 'package', icon: PaperAirplaneIcon },
  { name: 'Hotel', description: 'Cut your time searching for hotels', types: 'hotel', icon: PaperAirplaneIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default async function Header() { 
  const session = await auth()
  let dropdown = false;
  console.log(session)

  return (
        <header className="bg-white sticky top-0 h-20 z-20">
          <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
              <Link href={'/'} className="-m-1.5 p-1.5">
                <h1 className='font-extrabold text-xl text-gray-800'>Travelos</h1>
              </Link>
            </div>
            <div className="flex lg:hidden">
            </div>
            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
              <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  Travel
                  <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                </PopoverButton>
    
                <PopoverPanel
                  transition
                  className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="p-4">
                    {products.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                        </div>
                        <div className="flex-auto">
                          <Link href={`/pages/services/${item.types}`} className="block font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverPanel>
              </Popover>
    
              <Link href={'/pages/packages'} className="text-sm font-semibold leading-6 text-gray-900">
                Packages
              </Link>
              <Link href={'/pages/partnership'} className="text-sm font-semibold leading-6 text-gray-900">
                Partnership
              </Link>
              {/* if login as admin go to admin dashboard, else go to user dashboard */}
              {!session?.user  ?   (
                  <Link href={'/pages/dashboard/admin'} className="text-sm font-semibold leading-6 text-gray-900">
                    Dashboard
                  </Link>
              ) : (
                <Link href={'/pages/dashboard/user'} className="text-sm font-semibold leading-6 text-gray-900">
                    Dashboard
                </Link>
              )}

            </PopoverGroup>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                {/* <form
                    action={handleSignIn}>
                      <button type="submit" className="text-sm font-semibold rounded-md text-white shadow-sm px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Sign in
                      </button>
                  </form> */}

                {!session?.user? (
                  // <form
                  //   action={async() => {
                  //     "use server"
                  //     await signIn()
                  //   }}>
                  //     <button type="submit" className="w-32 text-sm font-semibold rounded-md text-white shadow-sm px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  //       Sign in
                  //     </button>
                  // </form>
                  <Link href='/pages/signIn' className='className="w-32 text-sm font-semibold rounded-md text-white shadow-sm px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"'> Sign In</Link>
                ) : (
                  <form
                  action={async() => {
                    "use server"
                    await signOut()
                  }}>
                    <button type="submit" className="w-32 text-sm font-semibold rounded-md text-white shadow-sm px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Sign Out
                    </button>
                </form>
                )}
            </div>
          </nav>
        </header>
    ) 
  
}
