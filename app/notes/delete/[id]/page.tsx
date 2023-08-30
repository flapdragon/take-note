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
    <div className="w-full max-w-2xl px-2">
      <div className="lg:flex lg:items-center mb-6">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Delete Note</h2>
      </div>

      {/* Note */}
      <div className="lg:flex lg:items-center mb-6">
        <div className="lg:w-1/3">
          <label className="block text-gray-700 font-bold lg:text-right mb-1 lg:mb-0 pr-4" htmlFor="note">
            Note*:
          </label>
        </div>
        <div className="lg:w-2/3">
          {body}
        </div>
      </div>

      {/* Client */}
      <div className="lg:flex lg:items-center mb-6">
        <div className="lg:w-1/3">
          <label className="block text-gray-700 font-bold lg:text-right mb-1 lg:mb-0 pr-4" htmlFor="client">
            Client:
          </label>
        </div>
        <div className="lg:w-2/3">
          {client}
        </div>
      </div>

      {/* Submit */}
      <div className="lg:flex lg:items-center mb-6">
        <div className="lg:w-1/3"></div>
        <div className="lg:w-2/3">
          <button
            onClick={handleDelete}
            className="bg-yellow-500 hover:bg-yellow-400 text-grey-700 font-bold py-2 px-4 rounded">
              Delete Note
          </button>
        </div>
      </div>
    </div>
  )
}
