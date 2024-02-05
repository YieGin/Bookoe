// SearchBar.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeSearchTerm } from '@/redux/features/productsSlice';
import { Spinner } from '..';
import Menu from './Menu';


const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const isLoading = useAppSelector((state) => state.products.isLoading);

  const handleSearch = () => {
    dispatch(changeSearchTerm(searchTerm));
    router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
  };
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='flex'>
      <div className='lg:flex xs:hidden gap-x-3 items-center border-[1px] px-5 rounded-l-[10px] h-[45px] dark:border-[#505050]'>
        <Menu />
      </div>
      <div className='flex items-center'>
        <input 
          className='lg:px-[25px] h-[45px] lg:w-[575px] md:w-[300px] xs:w-screen xs:px-5 placeholder:text-[16px] text-[#11142D] font-Roboto border-l-0 border-r-0 placeholder:font-sans dark:border-[#505050] border-[1px] placeholder:text-[#AAAAAA] text-[16px] focus:outline-none' 
          placeholder='Search over 30 million book titles' 
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button onClick={handleSearch} className='lg:flex xs:hidden gap-x-2 items-center border-[1px] px-4 rounded-r-[10px] h-[45px] dark:border-[#505050]'>
        {isLoading ? (
          <Spinner md />
        ) : (
          <CiSearch className="text-[24px] text-[#6C5DD3] dark:text-white" />
        )}
      </button>
    </div>
  );
};

export default SearchBar;
