import { Product } from '@/redux/features/productsSlice';
import React from 'react';

interface ProductAuthorDetailsProps {
    product: Product;
  }

const ProductAuthorDetails: React.FC<ProductAuthorDetailsProps> = ({ product }) => {
  return (
    <div className='flex gap-x-14'>
      <div className='flex gap-x-5 items-center'>
        <div className='bg-[#C4C4C4] rounded-[14px] w-12 h-12' />
        <div className='space-y-[2px]'>
          <p className='text-[#AAAAAA] text-[16px] font-sans'>Written by</p>
          <p className='text-[#11142D] text-[20px] font-semibold'>{product.author}</p>
        </div>
      </div>
      <div className='space-y-[2px]'>
        <p className='text-[#AAAAAA] text-[16px] font-sans'>Publisher</p>
        <p className='text-[#11142D] text-[20px] font-semibold'>{product.publisher}</p>
      </div>
      <div className='space-y-[2px]'>
        <p className='text-[#AAAAAA] text-[16px] font-sans'>Year</p>
        <p className='text-[#11142D] text-[20px] font-semibold'>{product.published_year}</p>
      </div>
    </div>
  );
};

export default ProductAuthorDetails;
