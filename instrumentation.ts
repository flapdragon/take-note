import { sql } from '@vercel/postgres'

export async function register() {
  const dropTable = await sql`
    DROP TABLE notes;
  `
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      body VARCHAR(300) NOT NULL,
      client VARCHAR(255),
      created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `
  console.log(`Created "notes" table`)
}