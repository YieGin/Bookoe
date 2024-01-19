// Books.js
'use client';
import React, { useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import BooksProducts from './BooksProducts';
import Pagination from './Pagination';
import { useAppDispatch } from '@/redux/hooks';
import { setDisplayFilter, setSelectedFilter } from '@/redux/features/filterSlice';
import { fetchProducts } from '@/redux/features/productsSlice';
import BooksFilter from './BooksFilter';

const Books: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Check if session storage is available and fetch the current page
  const getCurrentPage = () => {
    if (typeof window !== 'undefined') {
      return parseInt(sessionStorage.getItem('currentPage') || '1', 10);
    }
    return 1;
  };

  const [currentPage, setCurrentPage] = React.useState(getCurrentPage());

  useEffect(() => {
    dispatch(fetchProducts(currentPage));

    // Load saved filters from local storage
    const savedFilter = localStorage.getItem('selectedFilter');
    if (savedFilter) {
      const { filterValue, displayText } = JSON.parse(savedFilter);
      dispatch(setSelectedFilter(filterValue));
      dispatch(setDisplayFilter(displayText));
    }
  }, [currentPage, dispatch]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    sessionStorage.setItem('currentPage', newPage.toString());
    router.push(`/Books-List?page=${newPage}`);
  };

  return (
    <div className='w-full flex flex-col'>
      <h1 className='text-[#11142D] dark:text-[#F0F0F0] font-bold text-[40px]'>Books</h1>
      <BooksFilter />
      <BooksProducts currentPage={currentPage} />
      <Pagination currentPage={currentPage} setCurrentPage={handlePageChange} />
    </div>
  );
};

export default Books;
