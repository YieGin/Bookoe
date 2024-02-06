import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Footer, Navbar } from '@/components/common'
import Provider from '@/redux/provider'
import { Setup } from '@/components/utils'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bookoe',
  description: 'Bookoe Book Store Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <link rel="icon" type="image/svg+xml" href="/svgs/Logo-dark.svg" />
        <Provider>
            <Setup />
            <Navbar />
            <div className='fixed left-[-100px] top-[40%] z-50 rotate-90 font-bold text-[50px] gap-5 text-[#2E2E2E] dark:text-white font-Roboto xs:hidden lg:flex'>
              <span>B</span>
              <span>o</span>
              <span>o</span>
              <span>K</span>
              <span>o</span>
              <span>e</span>
            </div>
            {children}
            <Footer />
        </Provider>
      </body>
    </html>
  )
}
