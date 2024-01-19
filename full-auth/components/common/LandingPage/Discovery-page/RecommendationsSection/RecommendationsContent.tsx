'use client'
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchRecommendedProducts, Product } from '@/redux/features/productsSlice';

const RecommendationsContent = () => {
  const dispatch = useAppDispatch();
  const recommendedProducts = useAppSelector((state) => state.products.recommendedProducts);
  const [screenWidth, setScreenWidth] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(fetchRecommendedProducts());
  }, []);


  useEffect(() => {
    // Set the initial screenWidth on client-side only
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    updateScreenWidth(); // Set initial value
    window.addEventListener('resize', updateScreenWidth);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  useEffect(() => {
    // Determine the number of products to show based on screenWidth
    let numberToShow;
    if (screenWidth <= 390) {
      numberToShow = 2; // Show 2 products if screen width is 390px or less
    } else if (screenWidth <= 550) {
      numberToShow = 3; // Show 3 products if screen width is between 391px and 750px
    } else {
      numberToShow = 4; // Show 4 products if screen width is more than 750px
    }
    setVisibleProducts(recommendedProducts.slice(0, numberToShow));
  }, [screenWidth, recommendedProducts]);

  return (
    <div className="flex gap-x-5">
      <div className="relative flex gap-x-5 items-center justify-center w-full mt-5">
        {visibleProducts.map((product) => (
          <div key={product.id} className="md:min-w-[140px] h-[200px] border-[4px] cursor-pointer border-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out">
            <img src={`${process.env.NEXT_PUBLIC_HOST}${product.image}`} alt={product.title} className="w-full h-full object-cover hover:scale-105 lg:brightness-90 hover:brightness-100 transition-all duration-300 ease-in-out" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsContent;
