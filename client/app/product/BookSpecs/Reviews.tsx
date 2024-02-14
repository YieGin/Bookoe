import React from 'react';
import { Product } from '@/redux/features/productsSlice';
import { MdOutlineStar } from 'react-icons/md';
import { renderStars } from '@/app/books-list/Books/productUtils';

interface ProductBooksReviews {
  averageRating: Product | any;
  reviews: Product | any;
  ratingCount: Product | any;
}

const Reviews: React.FC<ProductBooksReviews> = ({ averageRating, reviews, ratingCount }) => {

  return (
    <div className='font-Cairo'>
      <div className='border-[1px] dark:border-[#464646] rounded-[14px] md:p-5 xs:p-2 flex xs:flex-col xl:flex-row justify-between'>
        <div className='xl:w-[40%]'>
          <div className='flex justify-between items-center'>
            <h1 className='font-bold md:text-[30px] xs:text-[20px] text-[#11142D] dark:text-[#fff]'>Rating Information</h1>
            <p className='text-[#FF754C] text-[16px] font-Rubik font-bold xs:flex md:hidden'>{averageRating} <span>/5</span></p>
          </div>
          <p className='md:text-[14px] xs:text-[11px] text-[#11142D] dark:text-[#D7D7D7] font-sans'>
            At Bookoe, we understand that every reader has unique preferences and interests.
            That&apos;s why we&apos;ve developed a comprehensive rating system to help you find books that align with your tastes and expectations.
            Our ratings provide insights into a book&apos;s content, style, and overall quality, guiding you towards your next favorite read.
          </p>
        </div>
        <div className='flex justify-between xs:flex-col md:flex-row mt-5 gap-x-5'>
          <div className='flex gap-x-5'>
            <div className='flex flex-col gap-y-3 w-full'>
              {[5, 4, 3, 2, 1].map(star => (
                <div className='flex gap-x-1 items-center w-full' key={star}>
                <MdOutlineStar className='text-orange-500 text-lg' />
                <p className='text-black dark:text-[#fff] font-bold text-lg'>{star}</p>
                <progress className='custom-progress h-2 md:w-[300px] xs:w-full ' value={ratingCount[star] || 0} max={reviews.length}></progress>
                <span className='dark:text-[#fff]'>{ratingCount[star] || 0}</span>
              </div>          
              ))}
            </div>
            
          </div>
          <div className='flex items-center flex-col justify-center'>
            <div className='flex'>
              <p className='text-[#11142D] dark:text-[#F0F0F0] md:text-[40px] font-bold xs:hidden md:flex items-center'>{averageRating} <span className='text-[#11142D] dark:text-[#F0F0F0] text-[16px] font-sans font-semibold ml-2'>out of 5</span></p>
            </div>
            <div className='md:flex md:gap-x-2 items-center xs:hidden'>
              {renderStars(parseInt(averageRating))}
            </div>
          </div>
        </div>
      </div>
      <p className='font-bold text-[18px] text-[#11142D] dark:text-[#fff] my-10'>Showing {reviews.length} of reviews</p>
      <div className='flex flex-col gap-y-5'>
        {reviews.map((review: any) => (
          <div key={review.id} className='border-[1px] dark:border-[#464646] rounded-[14px] lg-md:py-5 lg-md:px-10 md:py-5 md:px-5 xs:py-4 xs:px-4 flex flex-col'>
            <div className='flex items-center'>
              <div className='md:rounded-[14px] xs:rounded-lg bg-[#C4C4C4] md:w-12 md:h-12 xs:w-8 xs:h-8 md:mr-5 xs:mr-2' />
              <div className='w-full'>
                <div className='flex justify-between items-center'>
                  <p className='text-[#11142D] dark:text-[#fff] font-semibold md:text-[18px] xs:text-[15px]'>{review.user_name}</p>
                  <p className='text-[#FF754C] font-bold md:text-[28px] xs:text-[20px] md:hidden xs:flex'>{parseFloat(review.rating).toFixed(1)}</p>
                </div>
                <p className='text-[#AAAAAA] text-[14px] font-sans'>{new Date(review.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className='flex justify-between md:items-center md:mt-5 lg-md:mt-0 xs:flex-col md:flex-row'>
            {review.comment && (
              <p className='text-[#11142D] dark:text-[#F0F0F0] md:text-[16px] xs:text-[12px] md:mt-0 xs:mt-2'>{review.comment}</p>
            )}
              <div className='flex flex-col items-center xs:mt-2 md:mt-0 md:ml-2 lg-md:ml-0'>
                <p className='text-[#FF754C] font-bold md:text-[28px] xs:text-[20px] xs:hidden md:flex'>{parseFloat(review.rating).toFixed(1)}</p>
                <div className='md:flex xs:hidden gap-x-1'>
                  {renderStars(parseInt(review.rating))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
