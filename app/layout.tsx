import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './header'

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
        <Header />
        <div>{children}</div>
      </body>
    </html>
  )
}
