import React from 'react';
import { MdReviews } from 'react-icons/md';
import { AiFillLike } from 'react-icons/ai';
import { renderStars } from '@/app/books-list/Books/productUtils';
import { Product } from '@/redux/features/productsSlice';


interface ProductInfoProps {
  product: Product;
  averageRating: Product | any;
  reviews: Product | any;
  ratingCount: Product | any;
  }

const ProductStats: React.FC<ProductInfoProps> = ({ product, averageRating, reviews, ratingCount }) => {

  return (
    <div className='flex gap-2 items-center xs:flex-wrap md:flex-nowrap md:w-max xs:my-2 lg:my-0'>
      <div className='flex xs:gap-2 md:gap-x-2 items-center'>
        {renderStars(parseInt(averageRating))}
        <p className='mr-5 text-[#11142D] dark:text-[#F0F0F0] font-bold xl:text-[24px] md:text-[20px] xs:text-[18px]'>{averageRating}</p>
      </div>
      <div className='flex items-center md:gap-x-2 xs:gap-x-1'>
        <MdReviews className='text-[#6C5DD3] dark:text-[#8a7bf0] md:text-[30px] xl:flex lg:hidden' />
        <p className='mr-5 text-[#11142D] dark:text-[#F0F0F0] font-semibold lg:text-[14px] md:text-[18px] xs:text-[14px] font-sans'>{reviews.length} <span>Reviews</span></p>
      </div>
      <div className='flex items-center md:gap-x-2 xs:gap-x-1'>
        <AiFillLike className='text-[#6C5DD3] dark:text-[#8a7bf0] md:text-[30px] xl:flex lg:hidden' />
        <p className='mr-5 text-[#11142D] dark:text-[#F0F0F0] font-semibold lg:text-[14px] md:text-[18px] xs:text-[14px] font-sans'>{product.like}k <span>Like</span></p>
      </div>
    </div>
  );
};

export default ProductStats;
