'use client'
import React, { useEffect, useState } from 'react';
import { fetchBestSellers, fetchProductById } from '@/redux/features/productsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { IoArrowRedoCircle, IoArrowUndoCircle } from 'react-icons/io5';
import { MdNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const bestSellers = useAppSelector((state) => state.products.bestSellerProducts);
  const [currentBestSellerIndex, setCurrentBestSellerIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchBestSellers());
  }, [dispatch]);

  const handleNext = () => {
    setCurrentBestSellerIndex((prevIndex) => (prevIndex + 1) % bestSellers.length);
  };

  const handlePrevious = () => {
    setCurrentBestSellerIndex((prevIndex) => (prevIndex - 1 + bestSellers.length) % bestSellers.length);
  };

  const navigateToProductPage = async (productId: number) => {
    try {
      await dispatch(fetchProductById(productId)).unwrap();
      router.push(`/product/${productId}`);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
    }
  };
  
  const currentBestSeller = bestSellers[currentBestSellerIndex] || {};

  return (
    <div className='bg-[#9C9C9C] dark:bg-[#11161b] rounded-3xl h-[662px] md:flex xs:hidden items-center flex-col py-10 px-3'>
      <h1 className='font-bold text-white text-[38px]'>Best Seller</h1>
      <p className='text-white text-[14px] font-sans'>Based on sales this week</p>
      <div className='flex justify-center items-center'>
        <button 
          className="text-[#2c2c2c] dark:text-white p-2 m-2 bg-[#222] rounded-full shadow-lg"
          onClick={handlePrevious}
        >
          <GrFormPrevious className="sm:text-[25px] xs:text-[15px] text-white" />
        </button>
        {bestSellers.length > 0 && (
          <div onClick={() => navigateToProductPage(currentBestSeller.id)} className="w-[200px] h-[300px] border-4 cursor-pointer border-white mt-5 shadow-white rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out">
            <img 
              className="w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-in-out"
              src={`https://bookoegin-d820f894692b.herokuapp.com/${currentBestSeller.image}`}
              alt={currentBestSeller.title}
            />
          </div>
        )}
        <button 
          className="text-[#2c2c2c] dark:text-white p-2 m-2 bg-[#222] rounded-full shadow-lg"
          onClick={handleNext}
        >
          <MdNavigateNext className="sm:text-[25px] xs:text-[15px] text-white" />
        </button>
      </div>
      <h3 className='font-bold text-white text-[20px] mt-5'>{currentBestSeller.title}</h3>
      <div className='flex gap-x-3'>
        {currentBestSeller.categories && Array.isArray(currentBestSeller.categories) && currentBestSeller.categories.map((category, index) => ( 
          <p key={index} className='text-[#ccc] text-[16px] font-sans'>{typeof category === 'string' ? category : category.name}</p>
        ))}
      </div>
      
      <div className='bg-white rounded-[14px] w-[200px] h-[60px] mt-5 flex items-center justify-center gap-x-5 cursor-pointer'>
        <p className='text-[#AAAAAA] font-bold text-[18px] relative before:content-[""] before:block before:w-full before:h-[1px] before:bg-[#AAAAAA] before:absolute before:top-1/2 before:-translate-y-1/2'>
          {currentBestSeller.price}
        </p>
        <p className='text-[#11142D] font-bold text-[18px]'>
          USD {currentBestSeller.discount}
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
