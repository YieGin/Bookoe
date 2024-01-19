import React from 'react'
import Social from './Social'
import Categories from './Categories'
import Store from './Store'

const Footer = () => {
    

  return (
    <div className='flex xs:flex-wrap lg:flex-nowrap bg-[#F0F0F0] dark:bg-[#232323] pt-20 py-10 rounded-lg:px-44 xl:px-36 lg:px-20 md:px-10 xs:px-5 font-Cairo justify-between'>
      <Social />
      <Categories />
      <Store />
    </div>
  )
}

export default Footer
