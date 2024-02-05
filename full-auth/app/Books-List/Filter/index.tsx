'use client'
import React from 'react';
import Editor from './Editor';
import Publisher from './Publisher';
import Year from './Year';
import Category from './Category';
import Price from './Price';
import { fetchAllProducts } from '@/redux/features/productsSlice';
import { useAppDispatch } from '@/redux/hooks';
import { resetFilters } from '@/redux/features/filterSlice';
import { useRouter } from 'next/navigation';

interface FilterProps {
  onCloseFilter?: () => void;
}

const Filter: React.FC<FilterProps> = ({ onCloseFilter }) => {
  const dispatch = useAppDispatch();
  const router = useRouter()

  const handleRefineSearch = () => {
    dispatch(fetchAllProducts());
    if (onCloseFilter) {
      onCloseFilter();
    }
  };

  const handleResetFilters = () => {
    dispatch(resetFilters()); // Reset all filters in Redux state
    dispatch(fetchAllProducts()); // Fetch all products without filters
    router.push('/books-list');
  };


  return (
    <div className='font-Cairo w-full'>
      <h1 className='text-[#11142D] dark:text-[#F0F0F0] font-bold text-[40px] lg:flex xs:hidden'>Filter Option</h1>
      <div className='lg:sticky top-0 left-0'>
        <Editor />
        <Publisher />
        <Year />
        <Category />
        <Price />
      <button 
        onClick={handleRefineSearch}
        className='w-full rounded-[14px] flex items-center justify-center text-white font-bold text-[18px] bg-[#6C5DD3] hover:bg-[#6251cf] mt-5 py-4'>
        Refine Search
      </button>
      <button 
        onClick={handleResetFilters}
        className='w-full rounded-[14px] flex items-center justify-center text-[#AAAAAA] font-bold text-[18px] hover:text-[#6d6d6d] border-[1px] mt-5 py-4'>
        Reset Filter
      </button>
      </div>

    </div>
  );
};

export default Filter;
