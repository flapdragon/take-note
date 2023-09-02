'use client'

import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function DeleteNotePage() {
  // Router, params
  const router = useRouter()
  const params = useParams()
  // State
  const [body, setBody] = useState('')
  const [client, setClient] = useState('')

  // Fetch note data
  useEffect(() => {
    fetch(`/api/notes/${params.id}`, { method: 'GET' })
      .then((res) => res.json())
      .then((response) => {
        setBody(response.body)
        setClient(response.client)
      })
  }, [])

  // Update note
  const handleDelete = async (event: any) => {
    event.preventDefault()

    // Set data
    const data = {
      id: params.id
    }
    const JSONData = JSON.stringify(data)
    // API call
    const api = `/api/notes/${params.id}`
    const putOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSONData
    }
    const response = await fetch(api, putOptions)
    const result = await response.json()
    // Redirect to main notes page
    router.push('/')
  }

  return (
    <main className="grid place-items-center">
      <form>
        <div className="flex-1 pl-4 pr-4 mt-6 mx-2">
          <h1 className="mb-5 text-4xl text-gray-700 font-semibold text-center">Delete Note</h1>
        </div>

        <div className="flex-1 mb-6">
          <div className="col-span-2">
            <label className="block text-gray-700 font-bold lg:text-right mb-1 lg:mb-0 pr-4" htmlFor="note">
              Note*:
            </label>
            <textarea
              id="note"
              value={body}
              rows={5}
              placeholder="Note"
              disabled
              className="disabled rounded-lg bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight"></textarea>
          </div>
        </div>

        <div className="flex-1 mb-6">
          <label className="text-gray-700 font-bold lg:text-right mb-1 lg:mb-0 pr-4" htmlFor="client">
            Client:
          </label>
          <input
            id="client"
            type="text"
            value={client}
            placeholder="Client"
            disabled
            className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-800" />
        </div>

        <div className="flex-1 pl-4 pr-4 mt-6 mx-2">
          <button
            onClick={handleDelete}
            className="w-44 bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded">
              Delete Note
          </button>
        </div>
      </form>
    </main>
  )
}
