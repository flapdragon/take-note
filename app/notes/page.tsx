'use client'

import { useRouter } from 'next/navigation'

// TODO: Make form fields longer/wider
// TODO: Validate that post is successful
// TODO: Add dompurify and xss/sqli protections

export default function CreateNotePage() {
  const router = useRouter()

  const handleSubmit = async (event: any) => {
    event.preventDefault()
  
    // Data from form
    const data = {
      body: event.target.note.value,
      client: event.target.client.value
    }
    const JSONData = JSON.stringify(data)

    // Validate form data
    if (data.body.length < 20) {
      console.log("note validation message")
    }

    // Post to API
    const api = '/api/notes'
    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSONData
    }
    const response = await fetch(api, postOptions)
    const result = await response.json()

    // TODO: Add some param to let home page know post happened successfully
    
    // Redirect back to home page
    router.push('/')
  }

  return (
    <main className="grid place-items-center">
      <form>
        <div className="flex-1 pl-4 pr-4 mt-6 mx-2">
          <h1 className="mb-5 text-4xl text-gray-700 font-semibold text-center">Create a New Note</h1>
        </div>

        <div className="flex-1 mb-6">
          <div className="col-span-2">
            <label className="block text-gray-700 font-bold lg:text-right mb-1 lg:mb-0 pr-4" htmlFor="note">
              Note*:
            </label>
            <textarea
              id="note"
              rows={5}
              placeholder="Note"
              required
              minLength={20}
              maxLength={300}
              className="resize rounded-lg bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-400"></textarea>
              <p className="text-grey-400 text-xs italic">* Please enter between 20 and 300 characters.</p>
          </div>
        </div>

        <div className="flex-1 mb-6">
          <label className="text-gray-700 font-bold lg:text-right mb-1 lg:mb-0 pr-4" htmlFor="client">
            Client:
          </label>
          <input
            id="client"
            type="text"
            placeholder="Client"
            className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-400" />
        </div>

        <div className="flex-1 pl-4 pr-4 mt-6 mx-2">
          <button
            onSubmit={handleSubmit}
            className="w-44 bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded">
            Create Note
          </button>
        </div>
      </form>
    </main>
  )
}
