import React from 'react';
import { MdReviews } from 'react-icons/md';
import { AiFillLike } from 'react-icons/ai';
import { renderStars } from '@/app/Books-List/Books/productUtils';
import { Product } from '@/redux/features/productsSlice';


interface ProductInfoProps {
    product: Product;
  }

const ProductStats: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className='flex gap-x-2 items-center'>
      <div className='flex gap-x-2 items-center'>
        {renderStars(parseInt(product.stars))}
      </div>
      <p className='mr-5 text-[#11142D] font-bold text-[24px]'>{product.stars}</p>
      <MdReviews className='text-[#6C5DD3] text-[30px]' />
      <p className='mr-5 text-[#11142D] font-semibold text-[14px] font-sans'>{product.reviews} <span>Reviews</span></p>
      <AiFillLike className='text-[#6C5DD3] text-[30px]' />
      <p className='mr-5 text-[#11142D] font-semibold text-[14px] font-sans'>{product.like}k <span>Like</span></p>
    </div>
  );
};

export default ProductStats;
