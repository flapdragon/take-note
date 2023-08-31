'use client'

import Link from 'next/link'

export default function LayoutTest() {
  // Search
  const handleChangeSearch = (event: any) => {
    //
  }
  
  const IconDocumentText = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 inline">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  )

  return (
    <div>
      <div className="pl-4 pr-4 flex flex-col mt-6 mx-2">
        <h1 className="mb-5 text-4xl text-gray-800 font-semibold text-center">My Notes</h1>
      </div>

      <div className="pl-4 pr-4 flex flex-col mt-6 mx-2 text-center">
        <Link href='/notes'>
          <button className="bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold py-2 px-4 rounded align-middle">
            Create A Note <IconDocumentText />
          </button>
        </Link>
      </div>

      <div className="pl-4 pr-4 flex flex-col mt-6 mx-2">
        <div className="bg-white rounded-full border-none p-3 mb-4 shadow-md">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              id="search"
              type="text"
              placeholder="Search Notes..."
              className="ml-3 focus:outline-none w-full text-xl"
              onChange={handleChangeSearch} />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-md my-4">
            
        </div>
      </div>
    </div>
  )
}