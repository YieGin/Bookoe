'use client'
import React, { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {  useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchSpecialOffers } from '@/redux/features/productsSlice';
import { MdOutlineShoppingCart } from 'react-icons/md';

const SpecialOfferItem: React.FC<{ item: any; index: number }> = ({ item, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants: Variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.4 } },
    hidden: { opacity: 0, y: 20 }
  };

  return (
  <motion.div 
    ref={ref}
    initial="hidden"
    animate={controls}
    variants={variants}
    className='flex flex-col rounded-[14px] lg-md:w-[35%]'
  >
   <img className='h-[350px] object-cover rounded-[14px] relative top-5' src={`${process.env.NEXT_PUBLIC_HOST}${item.image}`} alt={item.image} />
      <div className='border-2 dark:border-[#313131] pb-10 px-5 font-Cairo rounded-[14px]'>
        <h1 className='md:mt-10 xs:mt-6 font-bold md:text-[24px] xs:text-[20px] text-[#11142D] dark:text-[#F0F0F0]'>{item.title}</h1>
        <div className='flex flex-wrap md:gap-2 xs:gap-1 md:my-5 xs:my-3'>
          {item.categories.map((category: any, index: any) => (
            <button key={index} className='rounded-[14px] bg-[#F0EEFF] hover:bg-[#ddd8fc] text-[#6C5DD3] xs:px-5 lg:px-5 lg-md:px-2 py-1 font-semibold font-sans delay-100 xs:text-[13px]'>
              {typeof category === 'string' ? category : category.name}
            </button>
          ))}
        </div>
        <p className='font-sans sm:text-[16px] xs:text-[12px] text-[#000] dark:text-[#F0F0F0] sm:w-[80%] line-clamp-2'>{item.topic}</p>
        <p className='md:my-5 xs:my-2 font-semibold text-[16px] text-[#11142D] dark:text-[#F0F0F0] font-sans'>{item.author}</p>
        <div className='flex justify-between'>
          <button className='flex items-center justify-center gap-x-3 rounded-[14px] bg-[#6C5DD3] xl:px-10 xl:py-3 lg:px-5 lg-md:px-2 lg-md:py-0 xs:px-5 xs:py-3'>
            <MdOutlineShoppingCart className='lg-md:text-[14px] xl:text-[18px]' color="#FFFFFF" />
            <p className='text-white font-bold xs:text-[10px] sm:text-[14px] lg-md:text-[14px] xl:text-[18px]'>Add to cart</p>
          </button>
          <div className='flex items-center lg:gap-x-5 lg-md:gap-x-1 xs:gap-x-2 sm:gap-x-2'>
            <p className='font-bold sm:text-[28px] lg:text-[25px] lg-md:text-[20px] text-[#11142D] dark:text-[#FFF]'>$ {item.discount}</p>
            <p className='text-[#AAAAAA] font-bold text-[18px] line-through'>{item.price}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SpecialPage = () => {
  const dispatch = useAppDispatch();
  const SpecialOffers = useAppSelector((state) => state.products.fetchSpecialOffers);

  useEffect(() => {
    dispatch(fetchSpecialOffers());
  }, []);


  return (
    <div className="flex gap-x-5 flex-col items-center xl:px-44 lg:px-24 md:px-10 xs:px-5">
      <h1 className='md:mt-20 xs:mt-10 font-bold font-Cairo lg:text-[50px] xs:text-[30px] md:text-[40px] text-[#11142D] dark:text-[#F0F0F0] text-center'>Special Offers</h1>
      <p className='text-center lg:w-[35%] text-[#11142D] dark:text-[#F0F0F0] font-sans md:text-[16px] xs:text-[13px] my-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <div className='flex gap-x-5 xs:flex-col lg-md:flex-row'>
        {SpecialOffers.map((item, index) => (
          <SpecialOfferItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SpecialPage;
