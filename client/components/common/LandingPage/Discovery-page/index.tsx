import React from 'react'
import PopularSection from './PopularSection'
import RecommendationsSection from './RecommendationsSection'

const index = () => {
  return (
    <div className='flex gap-5 xs:flex-wrap xl:flex-nowrap xl:px-44 lg:px-24 md:px-10 xs:px-5'>
      <RecommendationsSection />
      <PopularSection />
    </div>
  )
}

export default index
