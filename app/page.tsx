'use client'

// TODO: Add delete button
// TODO: Add edit button
// TODO: Make search case insensitive
// TODO: Style loading div

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  // Get Notes
  const [data, setData] = useState([])
  const [notes, setNotes] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    fetch('/api/notes')
      .then((res) => res.json())
      .then((response) => {
        setData(response)
        setNotes(response)
        setLoading(false)
      })
  }, [])

  // If there are no notes
  const NoNotes = () => {
    return <h2 className="mb-6 text-3xl font-bold">No Notes</h2>
  }

  // Search
  const handleChange = (event: any) => {
    setSearch(event.target.value)
  }

  const handleModal = (event: any) => {
    setCurrentId(event.target.value)
    setShowModal(!showModal)
  }

  // Loading
  if (isLoading) return <h2 className="mb-6 text-4xl font-bold p-4 animate-pulse">Loading...</h2>

  // Notes list
  const NotesList = () => {
    return (
      <div className="w-3/4 content-center">
        <div className="m-3">
          <h3 className="text-3xl font-bold">Notes</h3>
        </div>
        {data.filter((n: { id: number; body: string; client: string }) => search === '' || n.body.toLowerCase().includes(search.toLowerCase()) || n.client.toLowerCase().includes(search.toLowerCase()))
          .map((note: { id: number; body: string; client: string }) =>
            <Link key={note.id} href={`/notes/${note.id}`} style={{ cursor: 'pointer' }} title="Click to edit">
              <div className="bg-white text-gray-800 m-3 p-6 rounded-lg shadow-lg hover:bg-gray-200">
                <div className="flex justify-between items-center">
                  <div><h2 className="text-xl font-bold mb-2">This is the title</h2></div>
                  <div>
                    <Link href={`/notes/delete/${note.id}`} style={{ cursor: 'pointer' }} title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-red-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <p className="">{note.body}</p>
                <p className="text-gray-600">{note.client}</p>
              </div>
            </Link>
          )}
      </div>
    )
  }

  return (
    <main>
      <div className="w-3/4 bg-white rounded-full border-none m-3 p-3 mb-4 shadow-md text-xl">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            id="search"
            type="text"
            placeholder="Search Notes..."
            className="ml-3 focus:outline-none w-full"
            onChange={handleChange} />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <Link href='/notes'>
        <button
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
            Create A Note
          </button>
        </Link>
      </div>
      <div className="md:flex md:items-center mb-6">
        {data.length > 0 ?
          <NotesList />
        :
          <NoNotes />
        }
      </div>
    </main>
  )
}
