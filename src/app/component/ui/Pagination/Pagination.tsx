import React from 'react'

export default function Pagination({totalPosts, postsPerPage, setCurrentPage, currentPage} : {
    totalPosts: number,
    postsPerPage: number, 
    setCurrentPage: (value: number) => void, 
    currentPage:number}) {
    let pages = []

    for (let i  = 1; i<= Math.ceil(totalPosts/postsPerPage); i++) {
        pages.push(i);
    }

    return(
        <div className='flex justify-center items-center w-auto gap-5 pt-5'>
            {pages.map((page, index) => {
                return <button key={index} 
                className={`px-4 py-2 rounded ${page == currentPage ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-black'}`}
                onClick={() => setCurrentPage(page)}>{page}</button>
            })}
        </div>
    )
}
