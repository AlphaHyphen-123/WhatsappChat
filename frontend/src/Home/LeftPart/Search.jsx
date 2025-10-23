import React from 'react'
import { FaSearch } from "react-icons/fa";

function Search() {
  return (
    <div className='h-[10vh]'>
      <div className='text-black px-5 py-4'>
        <form action="">
          <div className='flex space-x-3' >
            <label className=" input w-[80%] border-[1px] rounded-lg border-gray-700 bg-amber-800">

              <input className='p-1 grow outline-none text-white' type="search" required placeholder="Search" />
            </label>
            <button>
              <FaSearch className='text-5xl  p-2 hover:bg-gray-600 text-white rounded-full duration-300' />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Search
