import React from 'react'
import Social from './Social'
import Categories from './Categories'
import Store from './Store'
import { FaHeart } from 'react-icons/fa'

const Footer = () => {
    

  return (
    <div className='bg-[#F0F0F0] dark:bg-[#232323] pt-20 py-10'>
      <div className='flex xs:flex-wrap lg:flex-nowrap xl:px-36 lg:px-20 md:px-10 xs:px-5 font-Cairo justify-between'>
        <Social />
        <Categories />
        <Store />
      </div>
      <hr className='md:my-10 xs:my-5 dark:border-[#525252] border-[#dddddd]' />
      <div className='h-[20px] flex items-center flex-wrap xl:px-36 lg:px-20 md:px-10 xs:px-5 justify-between'>
        <p className='text-[#464B70] dark:text-[#e2e2e2] font-semibold md:text-[16px] xs:text-[12px] sm:text-[14px] font-Cairo'>Bookoe Book Store Website  -  © 2024 All Rights Reserved</p>
        <p className='flex items-center gap-x-2 text-[#464B70] dark:text-[#e2e2e2] font-semibold text-[16px] xs:text-[12px] sm:text-[14px] font-Cairo'>Made with <FaHeart color='red' /> by Yie</p>
      </div>
    </div>
  )
}

export default Footer
