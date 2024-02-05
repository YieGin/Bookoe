import React from 'react';
import { useGetProductReviewsQuery } from '@/redux/services/apiSlice';
import { FaStar } from 'react-icons/fa';
import { Product, fetchProductById } from '@/redux/features/productsSlice';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import Link from 'next/link';

interface ProductBooksSpecs {
    product: Product;
  }

const ProductItem: React.FC<ProductBooksSpecs> = ({ product }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: reviews } = useGetProductReviewsQuery(product.id.toString());
  const reviewCount = reviews ? reviews.length : 0;
  const totalRating = reviews ? reviews.reduce((sum: any, review: any) => sum + review.rating, 0) : 0;
  const averageRating = reviewCount > 0 ? (totalRating / reviewCount).toFixed(1) : 'No Ratings';

  const navigateToProductPage = async (productId: number) => {
    try {
      await dispatch(fetchProductById(productId)).unwrap();
      router.push(`/product/${productId}`);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
    }
  };

  return (
    <div key={product.id} className='flex flex-col'>
      <div className="w-[295px] pr-7 relative">
        {typeof product.discount_percentage === 'number' && (
          <p className='text-[#fff] font-semibold sm:text-[16px] xs:text-[14px] absolute top-0 left-0 bg-[#FF754C] sm:py-2 sm:pl-1 sm:pr-3 xs:py-2 xs:pl-1 xs:pr-5 rounded-r-lg'>
            {product.discount_percentage.toFixed(2)}%
          </p>
        )}
        <img
          onClick={() => navigateToProductPage(product.id)}
          className="h-[400px] w-full object-cover rounded-lg transition-all duration-300 ease-in-out cursor-pointer"
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className='mt-5 pr-6'>
        <h1 className='font-bold text-[#11142D] dark:text-[#F0F0F0] text-[20px] font-Cairo line-clamp-1'>{product.title}</h1>
        <div className='flex flex-wrap gap-2'>
          {product.categories.map((category, index) => {
            const categoryName = typeof category === 'string' ? category : category.name;
            return (
              <Link 
                href={`/books-list?category=${encodeURIComponent(categoryName)}`}
                key={index}
                className='rounded-[14px] text-[#6C5DD3] font-semibold dark:text-[#7381fc] font-sans'
              >
                {categoryName}
              </Link>
            );
          })}
        </div>
        <div className='flex mt-5 justify-between'>
          <div className='flex gap-x-2'>
            <FaStar className="text-[24px] text-[#FF754C]" />
            <p className='text-[#FF754C] font-bold'>{averageRating}</p>
          </div>
          <div className='flex gap-x-2 items-center'>
            <p className='text-[#11142D] font-bold text-[20px] dark:text-[#F0F0F0]'>${product.discount}</p>
            <p className='text-[#AAAAAA] font-bold text-[16px] line-through'>${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
