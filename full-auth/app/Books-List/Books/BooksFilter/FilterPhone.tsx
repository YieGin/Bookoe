import React, { useState, useEffect } from 'react';
import Filter from '../../Filter';
import { MdOutlineFilterList } from 'react-icons/md';
import { IoClose, IoExitSharp } from 'react-icons/io5';

const FilterPhone = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  useEffect(() => {
    const body = document.body;
    
    if (isOpenFilter) {
      // Disable scrolling when the filter is opened
      body.style.overflow = 'hidden';
    } else {
      // Enable scrolling when the filter is closed
      body.style.overflow = 'auto';
    }

    // Clean up by resetting overflow to 'auto' when the component unmounts
    return () => {
      body.style.overflow = 'auto';
    };
  }, [isOpenFilter]);

  const handleCloseFilter = () => {
    setIsOpenFilter(false);
  };

  const handleOpenFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  return (
    <div className='xs:flex lg:hidden ml-auto '>
      <div onClick={handleOpenFilter} className='px-2 py-1 text-[#222] flex gap-x-2'>
        <p>Filter</p>
        <MdOutlineFilterList className='text-[25px]' />
      </div>
      <div className={`fixed top-0 right-0 h-full xs:w-full bg-white dark:bg-[#232323] md:w-[300px] shadow-lg z-50 transform ${isOpenFilter ? 'translate-x-0' : 'translate-x-full'} ease-in-out duration-300`}>
        {isOpenFilter ? (
          <div className='bg-white z-40 xs:w-full px-5 h-screen overflow-y-scroll scrollbar-hide pt-10'>
            <div onClick={handleOpenFilter}>
              <IoClose className='top-3 right-3 fixed text-[30px] z-10 text-[#222]' />
            </div>
            <Filter onCloseFilter={handleCloseFilter} />
          </div>
        ) : ''}
      </div>
    </div>
  );
};

export default FilterPhone;
