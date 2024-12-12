import '@/styles/globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Truth or Dare Game',
  description: 'An interactive Truth or Dare game for Gen Z',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}

