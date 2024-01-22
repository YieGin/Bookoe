'use client'
import React, { useEffect, useRef, useState } from 'react';
import { fetchAllProducts } from '@/redux/features/productsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Spinner } from '../..';
import { MdNavigateNext } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { GrFormPrevious } from "react-icons/gr";

const index = () => {
  const dispatch = useAppDispatch();
  const { allOfProducts, isLoading, error } = useAppSelector((state) => state.products);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  useEffect(() => {
    let timer: number;
    if (!isHovering) {
      timer = window.setInterval(() => {
        if (scrollRef.current) {
          if (scrollRef.current.scrollWidth - scrollRef.current.scrollLeft <= scrollRef.current.clientWidth) {
            scrollRef.current.scrollLeft = 0;
          } else {
            scrollRef.current.scrollLeft += 2;
          }
        }
      }, 10);
    }
    return () => clearInterval(timer);
  }, [isHovering]);


  const smoothScroll = (scrollOffset: number) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let startTime: number | null = null;
    const startScrollLeft = scrollContainer.scrollLeft;
    const duration = 500; 

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const nextStep = ease(elapsedTime, startScrollLeft, scrollOffset, duration);
      scrollContainer.scrollLeft = nextStep;

      if (elapsedTime < duration) {
        window.requestAnimationFrame(animateScroll);
      }
    };

    window.requestAnimationFrame(animateScroll);
  };

  // Ease function for smooth animation
  const ease = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };
  
  const stopDragging = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      // Logic that uses scrollRef.current
    }
  };
  
  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && scrollRef.current) {
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 2; // The number 2 here determines how fast the scroll will be
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  if (isLoading) return <div><Spinner /></div>;
  if (error) return <div>Error: {error}</div>;

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    stopDragging();
    setIsHovering(false);
  };

  return (
    <div className='xl:px-44 lg:px-24 md:px-10 xs:px-5'>
    <h1 className='text-[#11142D] dark:text-[#F0F0F0] font-bold md:text-[50px] xs:text-[30px] mt-20 mb-10'>Books on Sale</h1>
    <div className='flex items-center'>
      <button 
        className="absolute left-0 z-10 p-2 m-2 bg-[#222] rounded-full shadow-lg"
        onClick={() => smoothScroll(-900)}
      >
        <GrFormPrevious className="sm:text-[25px] xs:text-[15px] text-white" />
      </button>
      <div
          className='flex overflow-hidden flex-col font-Cairo'
          ref={scrollRef} 
          onMouseDown={startDragging}
          onMouseLeave={handleMouseLeave}
          onMouseUp={stopDragging}
          onMouseMove={onDrag}
          onMouseEnter={() => setIsHovering(true)}
        >
        <div className='flex'>
          {allOfProducts.map((product) => (
            <div key={product.id} className='flex flex-col cursor-pointer'>
              <div className="w-[295px] pr-7 relative">
                {typeof product.discount_percentage === 'number' && (
                  <p className='text-[#fff] font-semibold sm:text-[16px] xs:text-[14px] absolute top-0 left-0 bg-[#FF754C] sm:py-2 sm:pl-1 sm:pr-3 xs:py-2 xs:pl-1 xs:pr-5 rounded-r-lg'>
                    {product.discount_percentage.toFixed(2)}%
                  </p>
                )}
                <img
                  className="h-[400px] w-full object-cover rounded-lg transition-all duration-300 ease-in-out"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className='mt-5 pr-6'>
                <h1 className='font-bold text-[#11142D] dark:text-[#F0F0F0] text-[20px] font-Cairo line-clamp-1'>{product.title}</h1>
                <div className='flex flex-wrap gap-2'>
                  {product.categories.map((category, index) => (
                    <p key={index} className='rounded-[14px] text-[#9087c7] dark:text-[#8a7bf0] font-sans'>
                      {typeof category === 'string' ? category : category.name}
                    </p>
                  ))}
                </div>
                <div className='flex mt-5 justify-between'>
                  <div className='flex gap-x-2'>
                    <FaStar className="text-[24px] text-[#FF754C]" />
                    <p className='text-[#FF754C] font-bold'>{product.stars}</p>
                  </div>
                  <div className='flex gap-x-2 items-center'>
                    <p className='text-[#11142D] font-bold text-[20px] dark:text-[#F0F0F0]'>${product.discount}</p>
                    <p className='text-[#AAAAAA] font-bold text-[16px] line-through'>${product.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        className="absolute right-0 z-10 p-2 m-2 bg-[#222] rounded-full shadow-lg"
        onClick={() => smoothScroll(900)}
      >
        <MdNavigateNext className="sm:text-[25px] xs:text-[15px] text-white" />
      </button>
    </div>
    </div>
  );
};

export default index;