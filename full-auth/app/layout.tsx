import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Footer, Navbar } from '@/components/common'
import Provider from '@/redux/provider'
import { Setup } from '@/components/utils'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Full Aut',
  description: 'Full Auth application that provides jwt authentication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
            <Setup />
            <Navbar />
            {children}
            <Footer />
        </Provider>
      </body>
    </html>
  )
}
