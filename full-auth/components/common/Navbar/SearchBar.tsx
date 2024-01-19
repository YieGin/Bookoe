// SearchBar.tsx
import { Menu } from '@/public';
import Image from 'next/image';
import React from 'react';
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

const SearchBar: React.FC = () => (
  <div className='flex'>
    <div className='lg:flex xs:hidden gap-x-3 items-center border-[1px] px-5 rounded-l-[10px] h-[45px] dark:border-[#505050]'>
      <Image alt='Menu' src={Menu} className='w-5' />
      <p className='text-[#6C5DD3] dark:text-white font-bold text-[18px]'>Menus</p>
      <IoIosArrowDown size={16} className="text-[#6C5DD3] dark:text-white" />
    </div>
    <div className='flex items-center'>
      <input 
        className='lg:px-[25px] h-[45px] lg:w-[575px] md:w-[300px] xs:w-screen xs:px-5 placeholder:text-[16px] text-[#11142D] font-Roboto border-l-0 border-r-0 placeholder:font-sans dark:border-[#505050] border-[1px] placeholder:text-[#AAAAAA] text-[16px] focus:outline-none' 
        placeholder='Search over 30 million book titles' 
        type="text" 
      />
    </div>
    <div className='lg:flex xs:hidden gap-x-2 items-center border-[1px] px-4 rounded-r-[10px] h-[45px] dark:border-[#505050]'>
      <CiSearch className="text-[24px] text-[#6C5DD3] dark:text-white" />
    </div>
  </div>
);

export default SearchBar;
