'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BooksProducts from './BooksProducts';
import Pagination from './Pagination';
import { useAppDispatch } from '@/redux/hooks';
import { fetchProducts } from '@/redux/features/productsSlice';
import BooksFilter from './BooksFilter';
import { setYearFilter } from '@/redux/features/filterSlice';

const Books: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const year = searchParams.get('year') || '';

  const getCurrentPage = () => {
    if (typeof window !== 'undefined') {
      return parseInt(sessionStorage.getItem('currentPage') || '1', 10);
    }
    return 1;
  };

  const [currentPage, setCurrentPage] = useState(getCurrentPage());

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [currentPage, dispatch]);

  useEffect(() => {
    dispatch(setYearFilter(year));
  }, [year, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    sessionStorage.setItem('currentPage', newPage.toString());
  };

  return (
    <div className='w-full flex flex-col'>
      <h1 className='text-[#11142D] dark:text-[#F0F0F0] font-bold text-[40px]'>Books</h1>
      <BooksFilter />
      <BooksProducts currentPage={currentPage} categoryFilter={category} />
      <Pagination currentPage={currentPage} setCurrentPage={handlePageChange} />
    </div>
  );
};

export default Books;
