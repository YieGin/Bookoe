import { Product } from '@/redux/features/productsSlice';
import React from 'react';

interface ProductAuthorDetailsProps {
    product: Product;
  }

const ProductAuthorDetails: React.FC<ProductAuthorDetailsProps> = ({ product }) => {
  return (
    <div className='flex xl:gap-x-14 md:gap-x-5 xs:gap-0 xs:justify-between xs:w-full md:w-max xs:mb-5 md:mb-0'>
      <div className='flex md:gap-x-5 xs:gap-x-2 items-center'>
        <div className='bg-[#C4C4C4] md:rounded-[14px] xs:rounded-md md:w-12 md:h-12 xs:w-9 xs:h-9' />
        <div className='space-y-[2px]'>
          <p className='text-[#AAAAAA] dark:text-[#fff] xl:text-[16px] lg:text-[13px] md:text-[16px] xs:text-[11px] sm:text-[13px] font-sans'>Written by</p>
          <p className='text-[#11142D] dark:text-[#7381fc] xl:text-[20px] lg:text-[15px] md:text-[16px] xs:text-[11px] sm:text-[13px] font-semibold'>{product.author}</p>
        </div>
      </div>
      <div className='space-y-[2px]'>
        <p className='text-[#AAAAAA] dark:text-[#fff] xl:text-[16px] lg:text-[13px] md:text-[16px] xs:text-[11px] sm:text-[13px] font-sans'>Publisher</p>
        <p className='text-[#11142D] dark:text-[#7381fc] xl:text-[20px] lg:text-[15px] md:text-[16px] xs:text-[11px] sm:text-[13px] font-semibold'>{product.publisher}</p>
      </div>
      <div className='space-y-[2px]'>
        <p className='text-[#AAAAAA] dark:text-[#fff] xl:text-[16px] lg:text-[13px] md:text-[16px] xs:text-[11px] sm:text-[13px] font-sans'>Year</p>
        <p className='text-[#11142D] dark:text-[#7381fc] xl:text-[20px] lg:text-[15px] md:text-[16px] xs:text-[11px] sm:text-[13px] font-semibold'>{product.published_year}</p>
      </div>
    </div>
  );
};

export default ProductAuthorDetails;
