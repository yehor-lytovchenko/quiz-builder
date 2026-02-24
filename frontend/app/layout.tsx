import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Quiz Builder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b p-4 flex gap-6">
          <Link href="/quizzes" className="font-bold hover:underline">
            Quizzes
          </Link>
          <Link href="/create" className="hover:underline">
            + Create
          </Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
