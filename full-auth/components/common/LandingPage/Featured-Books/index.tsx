'use client'
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import DotPattern from './DotPattern';
import { Product, fetchAllProducts } from '@/redux/features/productsSlice'; 
import FeaturedLeft from './FeaturedLeft';
import FeaturedRight from './FeaturedRight';
import DotPatternBottom from './DotPatternBottom';

const FeaturedBooks = () => {
  const dispatch = useAppDispatch();
  const { allOfProducts } = useAppSelector((state) => state.products);
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  
  useEffect(() => {
    // Find the product with ID 1
    const productWithIdOne = allOfProducts.find(product => product.id === 15);
    setFeaturedProduct(productWithIdOne || null);
  }, [allOfProducts]);
  
  return (
    <div className='font-Cairo flex lg:justify-start md:justify-center lg:flex-row gap-x-5 pt-10 '>
      <div className='w-full h-full pb-14 md:px-10 xs:px-3 bg-[#f2f0fe] dark:bg-[#11161b] relative overflow-hidden'>
        <DotPattern />
        <div className='absolute top-0 right-2 bg-[#e5e3f3] dark:bg-[#FFE7D4] rounded-full w-[500px] h-[500px] xs:w-[100px] xs:h-[100px] -translate-y-1/2 translate-x-1/2'/>
        <div className='absolute bottom-0 z-0 left-2 bg-[#edebf8] dark:bg-[#FFE7D4] rounded-full md:w-[300px] md:h-[300px] translate-y-1/2 -translate-x-1/2'/>
        <div className='flex xl:flex-nowrap xs:flex-wrap md:gap-10 xs:gap-5'>
          <FeaturedLeft product={featuredProduct} />
          <FeaturedRight product={featuredProduct} />
        </div>
        <DotPatternBottom />
      </div>
    </div>
  )
}

export default FeaturedBooks;
