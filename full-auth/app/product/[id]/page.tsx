// ProductPage.tsx
'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { usePathname, useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/common';
import { Product, fetchAllProducts } from '@/redux/features/productsSlice';
import ProductHeroSection from '../ProductHeroSection';
import BookSpecs from '../BookSpecs';
import { BooksOnSale, Delivery } from '@/components/common/LandingPage';
import Ads from '../Ads';
import { useGetProductReviewsQuery } from '@/redux/services/apiSlice';


const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const productId = pathname.split('/').pop() || searchParams.get('id') || 'defaultProductId';
  
  const { data: reviews, isLoading, isError, refetch } = useGetProductReviewsQuery(productId, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });  

  useEffect(() => {
    if (productId !== 'defaultProductId') {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, productId]);

  const products = useAppSelector((state: RootState) => state.products.allOfProducts);
  const product = products.find((product) => product.id.toString() === productId);

  if (!product) {
    return <Spinner />;
  }

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  if (isError || !reviews) {
    return <div>Failed to load reviews.</div>;
  }

  
  const ratingCount = reviews.reduce((acc: { [key: number]: number }, review: Product) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});


  const totalRating = reviews.reduce((sum: number, review: Product) => sum + review.rating, 0);
  const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 'No Ratings';

  return (
    <div className='dark:bg-[#181c20] pb-20'>
      <div className='xl:px-44 lg:px-10 md:px-10 xs:px-5'>
        <div className='pt-20 flex gap-x-10 font-Cairo xs:flex-col lg:flex-row'>
          <img className='lg:rounded-[20px] xl:w-[400px] xl:h-[570px] lg:w-[350px] lg:h-[470px] object-cover' src={product.image} alt={product.title} />
          <ProductHeroSection product={product} averageRating={averageRating} reviews={reviews} ratingCount={ratingCount} />
        </div>
        <BookSpecs averageRating={averageRating} reviews={reviews} ratingCount={ratingCount} product={product} />
      </div>
      <Delivery />
      <BooksOnSale />
      <Ads />
    </div>
  );
}

export default ProductPage;