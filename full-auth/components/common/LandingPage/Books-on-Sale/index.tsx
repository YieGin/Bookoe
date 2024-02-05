'use client'
import React, { useEffect, useRef, useState } from 'react';
import { fetchAllProducts } from '@/redux/features/productsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Spinner } from '../..';
import { MdNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from "react-icons/gr";
import ProductItem from './ProductItem';

const BooksOnSale = () => {
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
            <ProductItem key={product.id} product={product} />
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

export default BooksOnSale;