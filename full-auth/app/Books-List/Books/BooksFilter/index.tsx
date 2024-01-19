'use client'
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSelectedFilter, setDisplayFilter, selectSelectedFilter, selectDisplayFilter } from '@/redux/features/filterSlice';
import { IoIosArrowDown } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import FilterPhone from './FilterPhone';

const getDateFilterValue = (filter: string): string => {
  switch (filter) {
    default:
      return filter;
  }
};

const BooksFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedFilter = useAppSelector(selectSelectedFilter);
  const [isOpen, setIsOpen] = useState(false);
  

  const handleFilterSelect = (filter: string, displayText: string) => {
    if (filter === 'Reset') {
      // Handle Reset option
      dispatch(setSelectedFilter('Featured')); // Clear selected filter
      dispatch(setDisplayFilter('')); // Clear display filter text
      localStorage.removeItem('selectedFilter'); // Remove from localStorage
    } else {
      const filterValue = getDateFilterValue(filter);
      dispatch(setSelectedFilter(filterValue));
      dispatch(setDisplayFilter(displayText));
      localStorage.setItem('selectedFilter', JSON.stringify({ filterValue, displayText }));
    }
    setIsOpen(false);
  };

  

  const filterOptions = ['Price: Low to High', 'Price: High to Low', 'Newest Arrivals', 'Alphabetical', 'Reset'];

  return (
    <div className='rounded-[14px] border-[1px] dark:border-[#5c5c5c] w-full h-[50px] flex items-center z-20'>
      <div className='lg:ml-auto h-full flex flex-col justify-center items-center px-6'>
        <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-x-3 justify-between dark:text-white'>
          {selectedFilter}
          <IoIosArrowDown className={`text-[#6C5DD3] dark:text-[#fff] text-[15px] transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className='absolute bg-white border-[1px] dark:border-[#5c5c5c] text-[#222] dark:bg-[#222] mt-[250px] p-4 space-y-3 dark:text-white rounded-lg flex flex-col'
            >
              {filterOptions.map((filterOption, index) => (
                <span
                  key={index}
                  className='cursor-pointer'
                  onClick={() => handleFilterSelect(filterOption, filterOption)}
                >
                  {filterOption}
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <FilterPhone />
    </div>
  );
};

export default BooksFilter;
