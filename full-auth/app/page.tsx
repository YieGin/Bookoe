import { Hero, Delivery, Discovery, Special, BooksOnSale, FeaturedBooks, Testimonials, News, StatsPage } from '@/components/common/LandingPage'
import React from 'react'

const Page = () => {
  
  return (
    <div className='dark:bg-[#181c20] pb-20'>
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
