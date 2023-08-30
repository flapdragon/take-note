'use client'

import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

// TODO: Make form fields longer/wider
// TODO: Validate that id for initial GET is valid
// TODO: Validate that save is successful
// TODO: Add dompurify and xss/sqli protections

export default function EditNotePage() {
  // Router, params
  const router = useRouter()
  const params = useParams()
  // State
  const [body, setBody] = useState('')
  const [client, setClient] = useState('')
  const [status, setStatus] = useState(true)

  // Fetch note data
  useEffect(() => {
    fetch(`/api/notes/${params.id}`, { method: 'GET' })
      .then((res) => res.json())
      .then((response) => {
        setBody(response.body)
        setClient(response.client)
        setStatus(true)
      })
  }, [])

  const handleChangeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // TDOD?: Add validation here too?
    setBody(event.target.value)
  }

  const handleChangeClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClient(event.target.value)
  }

  // Update note
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    // If note is between 20 and 300 characters inclusive
    if (body.length >= 20 && body.length <= 300) {
      // Data from form
      const data = {
        id: params.id,
        body: body,
        client: client
      }
      const JSONData = JSON.stringify(data)
      const api = `/api/notes/${params.id}`
      const putOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSONData
      }
      const response = await fetch(api, putOptions)
      const result = await response.json()
      router.push('/')
    }
  }

  return (
    <form className="w-full max-w-2xl px-2">
      <div className="lg:flex lg:items-center mb-6">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Edit Note</h2>
      </div>

      {/* Note */}
      <div className="lg:flex lg:items-center mb-6">
        <div className="lg:w-1/3">
          <label className="block text-gray-700 font-bold lg:text-right mb-1 lg:mb-0 pr-4" htmlFor="note">
            Note*:
          </label>
        </div>
        <div className="lg:w-2/3">
          <textarea
            id="note"
            value={body}
            onChange={handleChangeBody}
            rows={5}
            placeholder="Note"
            required
            minLength={20}
            maxLength={300}
            className="resize rounded-lg bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"></textarea>
            <p className="text-grey-400 text-xs italic">* Please enter between 20 and 300 characters.</p>
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
          <input
            id="client"
            type="text"
            value={client}
            onChange={handleChangeClient}
            placeholder="Client"
            className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" />
        </div>
      </div>

      {/* Submit */}
      <div className="lg:flex lg:items-center mb-6">
        <div className="lg:w-1/3"></div>
        <div className="lg:w-2/3">
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 hover:bg-yellow-400 text-grey-700 font-bold py-2 px-4 rounded">
            Save Changes
          </button>
        </div>
      </div>
    </form>
  )
}
