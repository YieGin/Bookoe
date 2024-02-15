'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchFavoriteProducts } from '@/redux/features/productsSlice';
import ProductItem from './ProductItem';
import Link from 'next/link';
import { LuHeartOff } from 'react-icons/lu';

const Favorites = () => {
  const dispatch = useAppDispatch();
  const favoriteProducts = useAppSelector((state) => state.products.favoriteProducts);

  useEffect(() => {
    dispatch(fetchFavoriteProducts());
  }, [dispatch]);

  if (favoriteProducts.length === 0) {
    return (
      <div className='h-screen flex flex-col items-center justify-center xs:px-5 dark:bg-[#11161b]'>
        <LuHeartOff className='text-[#ABABAB] text-[40px] mb-5' />
        <h1 className='text-[30px] font-bold font-Rubik text-[#11142D] dark:text-[#FFF]'>Wishlist is empty.</h1>
        <p 
          className='md:text-[20px] xs:text-[15px] font-sans dark:text-[#ABABAB] text-[#ABABAB] text-center'>
          You don’t have any products in the wishlist yet. You will find a lot of interesting products on our 
          <Link className='text-[#6C5DD3] ml-1 dark:text-[#7381fc] underline-offset-1 underline' href={'/books-list'}>books-list.</Link>
        </p>
      </div>
    );
  }

  const containerHeight = favoriteProducts.length <= 3 ? 'h-screen' : 'h-full';

  return (
    <div className='font-Cairo flex flex-col pt-5 pb-20 dark:bg-[#11161b]'>
      <h1 className='font-bold text-[40px] dark:text-white font-Rubik pl-10'>Favorites</h1>
      <hr className="border-0 h-0 bg-transparent md:my-10 xs:my-5" style={{ borderStyle: 'dotted', borderWidth: '2px', borderColor: '#ABABAB', borderSpacing: '44px' }} />
      <div className={`flex flex-wrap gap-5 xl:px-60 lg:px-24 md:px-10 xs:px-0 ${containerHeight}`}>
        {favoriteProducts.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
