import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Note Taking App',
  description: 'Next.js app for taking notes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen from-purple-100 via-rose-300 to-violet-500 bg-gradient-to-br">{children}</div>
      </body>
    </html>
  )
}
