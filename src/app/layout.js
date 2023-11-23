import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chat AI',
  description: 'Chat With your PDF files. Ask any question and get an instant answer.',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <>
            <Toaster />
            <Navbar />
            {children}
          </>
        </body>
      </html>
    </ClerkProvider>
  )
}
