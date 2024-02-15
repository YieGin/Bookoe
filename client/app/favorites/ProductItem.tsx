'use client';
import React, { useEffect, useState } from 'react';
import { Product, fetchFavoriteProducts, fetchProductById } from '@/redux/features/productsSlice';
import { useGetProductReviewsQuery } from '@/redux/services/apiSlice';
import { MdOutlineClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeFromFavorite, fetchFavorites } from '@/redux/features/favoritesSlice';
import { fetchFavoritesCount } from '@/redux/features/favoritesCountSlice';
import { useRouter } from 'next/navigation';

interface ProductTypes {
  item: Product;
}

const ProductItem: React.FC<ProductTypes> = ({ item }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const [isFavorite, setIsFavorite] = useState(favorites.some(fav => fav.productId === item.id));

  useEffect(() => {
    setIsFavorite(favorites.some(fav => fav.productId === item.id));
    dispatch(fetchFavorites());
  }, []);

  const handleRemoveFromFavorite = async () => {
    await dispatch(removeFromFavorite(item.id));
    dispatch(fetchFavoritesCount());
    dispatch(fetchFavoriteProducts());
  };
  
  const navigateToProductPage = async (productId: number) => {
    try {
      await dispatch(fetchProductById(productId)).unwrap();
      router.push(`/product/${productId}`);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
    }
  };

  const { data: reviews } = useGetProductReviewsQuery(item.id.toString());
  const reviewCount = reviews ? reviews.length : 0;
  const totalRating = reviews ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) : 0;
  const averageRating = reviewCount > 0 ? (totalRating / reviewCount).toFixed(1) : 'No Ratings';

  return (
    <div className='border-b-[1px] dark:border-[#333333] md:p-5 xs:p-3 flex xs:w-full md:w-[700px] lg-md:w-[45%]'>
      <img onClick={() => navigateToProductPage(item.id)} className='md:w-40 md:h-40 xs:w-28 xs:h-36 rounded-[14px] object-cover mr-3 cursor-pointer' src={`https://bookoegin-d820f894692b.herokuapp.com/${item.image}`} alt={item.title} />
      <div className='flex flex-col w-full'>
        <div className='flex justify-between items-center mb-3'>
          <p className='font-bold md:text-[20px] text-[#11142D] dark:text-[#fff]'>{item.title}</p>
          <button onClick={handleRemoveFromFavorite}>
            <MdOutlineClose className='text-[20px] text-[#11142D]' />
          </button>
        </div>
        <div className='flex flex-col gap-y-1'>
          <p className='text-[#ABABAB] font-Roboto md:text-[16px] xs:text-[13px]'>auth: <span>{item.author}</span></p>
          <p className='text-[#ABABAB] font-Roboto md:text-[16px] xs:text-[13px]'>Publisher: <span>{item.publisher}</span></p>
          <p className='text-[#ABABAB] font-Roboto md:text-[16px] xs:text-[13px]'>Year: <span>{item.published_year}</span></p>
          <p className='text-[#ABABAB] font-Roboto md:text-[16px] xs:text-[13px]'>AverageRating: {averageRating}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
