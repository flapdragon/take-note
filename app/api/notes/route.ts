import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

// TODO: Add 20-300 note body validation on POST
// TODO: Now that I'm using a real database I need to worry about ORDER

export async function GET() {
  // const sql = 'SELECT * FROM notes'
  const notes = await sql`SELECT * FROM notes ORDER BY created_date DESC;`
  return NextResponse.json(notes.rows)
}

export async function POST(request: Request) {
  const note = await request.json()
  // const sql = 'INSERT INTO notes(title, body, client) VALUES (?, ?, ?)'
  // const newNote = db.prepare(sql).run('', note.body, note.client)
  const newNote = await sql`INSERT INTO notes(title, body, client) VALUES ('', ${note.body}, ${note.client});`
  return NextResponse.json({ "status": "success" })
}
