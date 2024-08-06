'use client'
import Header from "./component/ui/NavBar";
import Hero from "./component/ui/Hero";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SessionProvider, signOut, useSession } from "next-auth/react";

const DummyData = [
  {
    id: "1",
    name: "Bali's cottage",
    desc: "Bali's cottage for rent",
    price: 2500000,
    image: "https://images.unsplash.com/photo-1570127828934-c60aa3e1e5af?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "2",
    name: "lorem",
    desc: "lorem10",
    price: 2500000,
    image: "https://images.unsplash.com/photo-1579297206620-c410c4af42e4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "3",
    name: "lorem",
    desc: "lorem10",
    price: 2500000,
    image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "4",
    name: "lorem",
    desc: "lorem10",
    price: 2500000,
    image: "https://images.unsplash.com/photo-1579297206620-c410c4af42e4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "5",
    name: "lorem",
    desc: "lorem10",
    price: 2500000,
    image: "https://images.unsplash.com/photo-1579297206620-c410c4af42e4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]

export default function Home() {
  const session = useSession();

  return (
    <main className="p-1">
      <Hero/>

      <div>
        {/* {session?.data?.user?.name} */}
      </div>
      <div className="pt-20 p-6 mx-auto flex justify-between ">
        <div className="flex">
          <div>
            <h1 className="p-2 font-light text-gray-800">Search place..</h1>
            <Input type="text" className="shadow-md bg-white w-auto border p-2 rounded-xl" placeholder="Try London..." data-focus data-hover/>
          </div>
          <div>
            <h1 className="p-2 font-light text-gray-800">Check In Date</h1>
            <Input type="date" className="shadow-md text-white w-auto border p-2 rounded-xl bg-indigo-600 " placeholder="your date" data-focus data-hover/>
          </div>
          <div>
            <h1 className="p-2 font-light text-gray-800">Check Out Date</h1>
            <Input type="date" className="shadow-md text-white w-auto border p-2 rounded-xl bg-indigo-600 " placeholder="your date" data-focus data-hover/>
          </div>
        </div>
        <div className="pt-10">
          <button className=" shadow-md rounded-lg p-3 bg-indigo-600 hover:bg-indigo-500">
            <MagnifyingGlassIcon width={20} height={20} color="white"/>
          </button>
          
        </div>
        
      </div>

      <div className="p-6 pt-10 flex flex-wrap justify-between">
        {DummyData.map((item) => {
          return(
            <div key={item.id} className="rounded-md shadow-md h-auto pt-5">
              <a
              href="#">
                <img src={item.image} className="object-cover rounded-md h-32 w-64"/>
                <div className="flex flex-row justify-between p-5">
                  <h1>{item.name}</h1>
                  <h1 className="font-light">{item.price}</h1>
                </div>
              </a>
              
            </div>
          )
        })}
      </div>
      
      <div>
        
      </div>
    </main>
  );
}
