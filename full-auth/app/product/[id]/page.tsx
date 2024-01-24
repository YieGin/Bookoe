// ProductPage.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { usePathname, useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/common';
import { fetchAllProducts } from '@/redux/features/productsSlice';
import ProductHeroSection from '../ProductHeroSection';
import BookSpecs from '../BookSpecs';
import { BooksOnSale, Delivery } from '@/components/common/LandingPage';
import Ads from '../Ads';

export default function ProductPage() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productId = pathname.split('/').pop() || searchParams.get('id');
  const products = useAppSelector((state: RootState) => state.products.allOfProducts);
  const product = products.find((product) => product.id.toString() === productId);

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch]);

  if (!productId || !product) {
    return <Spinner />;
  }


  return (
    <>
      <div className=' xl:px-44 lg:px-24 md:px-10 xs:px-5'>
        <div className='mt-20 flex gap-x-10 font-Cairo'>
          <img className='rounded-[20px] w-[400px] h-[570px] object-cover' src={product.image} alt={product.title} />
          <ProductHeroSection product={product} />
        </div>
        <BookSpecs product={product} />
      </div>
      <Delivery />
      <BooksOnSale />
      <Ads />
    </>
  );
}

