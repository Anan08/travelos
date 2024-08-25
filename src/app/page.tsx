'use client'

import Hero from "./component/ui/Hero/Hero";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Pagination from "./component/ui/Pagination/Pagination";

const DummyData = [
  {
    id: "1",
    name: "package",
    link: "/pages/packages",
    image: "https://plus.unsplash.com/premium_photo-1669863280566-cffeb0fc13c5?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "2",
    name: "Activities",
    link: "ads",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "3",
    name: "Hotel",
    link: "safa",
    image: "https://images.unsplash.com/photo-1723883973654-474fd909d3b7?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "4",
    name: "lorem",
    link: "dfs",
    image: "https://images.unsplash.com/photo-1723910039057-7e6a616b6e86?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]

interface dataProps {
  id:string,
  title:string,
  desc:string,
  prices:number
}



export default function Home() {

  const session = useSession();
  const [data, setData] = useState<dataProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

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
  }, [currentPage])
  

  return (
    <main className="">
      <Hero/>

      <div>
        {/* {session?.data?.user?.name} */}
      </div>
      {/* <div className="pt-[100px] mx-auto flex justify-between">
        <div className="flex p-6">
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
        
      </div> */}

      <div className="pt-[30px]">
        <div>
          <h1 className="font-bold p-6 text-xl">Enchance Your Trip!</h1>
        </div>
        <div className="grid grid-cols-4 justify-evenly p-6 gap-4">
          {DummyData.map((pkg) => {
            return (
              <div key={pkg.id}className="rounded-md shadow-md w-64 h-72 ">
                <Link href={pkg.link}>
                  <div className="absolute flex flex-col flex-wrap">
                    <img src={pkg.image} alt="img" className="w-64 h-72 bg-contain rounded-md relative z-0 object-cover"/>
                    <h1 className="absolute font-bold z-10 text-white text-xl px-4 py-2 rounded bottom-2">{pkg.name}</h1>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

      </div>

      
    </main>
  );
}
