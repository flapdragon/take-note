import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

// TODO: Add 20-300 note body validation on PUT

// Get note by id
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const note = await sql`SELECT * FROM notes WHERE ID = ${params.id};`
  return NextResponse.json(note.rows[0])
}

// Update note by id
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  // Form note data
  const formNote = await request.json()
  // Update note
  const updateNote = sql`UPDATE notes SET title = '', body = ${formNote.body}, client = ${formNote.client} WHERE id = ${params.id};`
  return NextResponse.json({ "status": "success" })
}

// Delete note by id
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // Form note data
  const formNote = await request.json()
  // Delete note
  const deleteNote = sql`DELETE FROM notes WHERE id = ${params.id};`
  return NextResponse.json({ "status": "success" })
}
