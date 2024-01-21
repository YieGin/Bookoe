import { Hero, Delivery, Discovery, Special, BooksOnSale, FeaturedBooks, Testimonials, News, StatsPage } from '@/components/common/LandingPage'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  
  return (
    <div className='dark:bg-[#181c20] pb-20'>
      <Link href="/product/22">
        <p>Go to Product 12</p>
      </Link>
      <Hero />
      <Delivery />
      <Discovery />
      <Special />
      <BooksOnSale />
      <FeaturedBooks />
      <Testimonials />
      <News />
      <StatsPage />
    </div>
  )
}

export default Page
