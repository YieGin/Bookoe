import React from 'react';
import { useGetProductReviewsQuery } from '@/redux/services/apiSlice';
import { LiaStarSolid } from 'react-icons/lia';
import { IoCartOutline } from 'react-icons/io5';
import Link from 'next/link';

interface ProductBooksSpecs {
  item: any;
  onAddToCart: any;
  onNavigate: any;
}

const RelatedBookItem: React.FC<ProductBooksSpecs> = ({ item, onAddToCart, onNavigate }) => {
  const { data: reviews } = useGetProductReviewsQuery(item.id.toString());
  const reviewCount = reviews ? reviews.length : 0;
  const totalRating = reviews ? reviews.reduce((sum: any, review: any) => sum + review.rating, 0) : 0;
  const averageRating = reviewCount > 0 ? (totalRating / reviewCount).toFixed(1) : 'No Ratings';

  return (
    <div key={item.id} className='flex gap-x-5'>
      <img onClick={onNavigate} className='lg:w-[140px] lg:h-[190px] md:w-[240px] md:h-[290px] xs:w-[150px] xs:h-[170px] cursor-pointer  rounded-[14px] object-cover' src={item.image} alt={item.title} />
      <div>
        <h1 className='text-[#11142D] dark:text-[#fff] lg:text-[18px] md:text-[25px] xs:text-[14px] sm:text-[18px] font-bold line-clamp-1'>{item.title}</h1>
        <div className='flex md:gap-x-2 xs:gap-1 line-clamp-1'>
          {item.categories.map((category: any, index: number) => {
            const categoryName = typeof category === 'string' ? category : category.name;
            return (
              <Link 
                href={`/books-list?category=${encodeURIComponent(categoryName)}`} 
                key={`${item.id}-${index}`}
                className='text-[#6C5DD3] dark:text-[#7381fc] lg:text-[14px] md:text-[20px] xs:text-[11px] sm:text-[14px] font-sans line-clamp-1'
              >
                {categoryName}
              </Link>
            );
          })}
        </div>
        <div className='flex gap-x-1 items-center my-3'>
          <LiaStarSolid className='text-[#FF754C] lg:text-[20px] md:text-[30px] xs:text-[14px]' />
          <h3 className='text-[#FF754C] lg:text-[18px] md:text-[25px] font-bold'>{averageRating}</h3>
          <h3 className='text-[#AAAAAA] lg:text-[14px] md:text-[20px] xs:text-[14px] font-semibold line-clamp-1 ml-2 mt-1'>{reviewCount} reviews</h3>
        </div>
        <div className='flex gap-x-3 items-center mb-3'>
          <p className='text-[#11142D] dark:text-[#F0F0F0] lg:text-[18px] md:text-[25px] xs:text-[18px] font-bold'>${item.discount}</p>
          <p className='text-[#AAAAAA] lg:text-[16px] md:text-[22px] xs:text-[14px] font-semibold'>${item.price}</p>
        </div>
        <div onClick={onAddToCart} className='button px-3'>
          <IoCartOutline className='text-[#fff] lg:text-[20px] md:text-[25px] sm:text-[18px]' />
          <p className='text-white font-bold xs:text-[10px] sm:text-[14px] lg-md:text-[14px]'>Add to cart</p>
        </div>
      </div>
    </div>
  );
};

export default RelatedBookItem;
