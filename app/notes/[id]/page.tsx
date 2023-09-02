'use client'

import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

// TODO: Validate that id for initial GET is valid
// TODO: Validate that save is successful
// TODO: Add dompurify and xss/sqli protections
// TODO: Add some param to let home page know put/update happened successfully

export default function EditNotePage() {
  // Router, params
  const router = useRouter()
  const params = useParams()

  // State
  const [body, setBody] = useState('')
  const [bodyCharacters, setBodyCharacters] = useState(0)
  const [client, setClient] = useState('')
  const [showValidation, setShowValidation] = useState(false)

  // Ref
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  // Fetch note data
  useEffect(() => {
    fetch(`/api/notes/${params.id}`, { method: 'GET' })
      .then((res) => res.json())
      .then((response) => {
        setBody(response.body)
        setBodyCharacters(response.body.length)
        setClient(response.client)
      })
  }, [])

  const handleChangeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value)
    setBodyCharacters(event.target.value.trim().length)
  }

  const handleChangeClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClient(event.target.value)
  }

  // Update note
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    // If note is between 20 and 300 characters inclusive and not just a bunch of spaces
    if (body.trim().length < 20 || body.trim().length > 300 || /\s{3,}/g.test(body)) {
      // Focus on textarea field
      textAreaRef.current?.focus()
      // Set status that shows the shake style
      setShowValidation(true)
      // Reset status
      setTimeout(() => {
        setShowValidation(false)
      }, 2000)
    }
    else {
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

      // Redirect back to home page
      router.push('/')
    }
  }

  return (
    <main className="grid place-items-center">
      <form>
        <div className="flex-1 pl-4 pr-4 mt-6 mx-2">
          <h1 className="mb-5 text-4xl text-gray-700 font-semibold text-center">Edit Note</h1>
        </div>

        <div className="flex-1 mb-6">
          <div className="col-span-2">
            <label className="block text-gray-700 font-bold lg:text-right mb-1 lg:mb-0 pr-4" htmlFor="note">
              Note*:
            </label>
            <textarea
              id="note"
              ref={textAreaRef}
              value={body}
              onChange={handleChangeBody}
              rows={5}
              placeholder="Note"
              required
              minLength={20}
              maxLength={300}
              className={`resize rounded-lg bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-cyan-400 ${showValidation ? 'field-validation' : ''}`}></textarea>
              <p className="text-grey-400 text-xs italic">* Please enter between 20 and 300 characters. Currently: {bodyCharacters}</p>
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
            onChange={handleChangeClient}
            placeholder="Client"
            className="w-full bg-gray-100 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-cyan-400" />
        </div>

        <div className="flex-1 pl-4 pr-4 mt-6 mx-2">
          <button
            onClick={handleSubmit}
            className="w-44 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded">
            Save Changes
          </button>
        </div>
      </form>
    </main>
  )
}
