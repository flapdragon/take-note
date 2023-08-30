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
    <form className="w-full max-w-2xl px-2" onSubmit={handleSubmit}>
      <div className="lg:flex lg:items-center mb-6">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Create a New Note</h2>
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
            placeholder="Client"
            className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" />
        </div>
      </div>

      {/* Submit */}
      <div className="lg:flex lg:items-center mb-6">
        <div className="lg:w-1/3"></div>
        <div className="lg:w-2/3">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-grey-700 font-bold py-2 px-4 rounded">
            Create Note
          </button>
        </div>
      </div>
    </form>
  )
}
