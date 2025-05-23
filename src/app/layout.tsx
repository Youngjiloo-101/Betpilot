import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { WalletProvider } from '@/contexts/WalletContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BetPilot - Advanced Betting Platform',
  description: 'Smart betting platform with AI assistance, reverse odds engineering, and more',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </WalletProvider>
      </body>
    </html>
  )
}
