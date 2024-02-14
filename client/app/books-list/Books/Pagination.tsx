import { useAppSelector } from '@/redux/hooks';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage }) => {
  const totalPages = useAppSelector((state) => state.products.totalPages);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`mx-1 rounded-[14px] sm:px-3 sm:py-3 xs:px-2 xs:py-2 text-[#11142D] dark:text-[#fff] font-semibold ${
            i === currentPage ? 'bg-[#6C5DD3] text-white sm:px-5 sm:py-3 xs:px-2 xs:py-2' : ''
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return <div className="flex justify-center items-center">{pages}</div>;
  };

  return (
    <div className='mt-20 md:ml-auto gap-x-5 flex items-center'>
      <button 
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        className='rounded-[14px] bg-[#F0F0F0] xs:px-3 py-2 sm:px-5 text-[#11142D] font-semibold sm:text-[18px] xs:text-[14px] font-sans'
      >
        Previous
      </button>
      {renderPagination()}
      <button 
        onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
        className='rounded-[14px] bg-[#F0F0F0] xs:px-3 py-2 sm:px-5 text-[#11142D] font-semibold sm:text-[18px] xs:text-[14px] font-sans'
      >
        Next
      </button>
    </div>
  )
}

export default Pagination;