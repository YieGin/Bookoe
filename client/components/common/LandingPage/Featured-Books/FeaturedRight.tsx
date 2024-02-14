'use client'
import React, { useState, useEffect } from 'react';
import { Product } from '@/redux/features/productsSlice';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FeaturedLeftProps {
  product: Product | null;
}

const ImageItem: React.FC<{ img: any; index: number }> = ({ img, index }) => {
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
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: index * 0.3 } },
    hidden: { opacity: 0, scale: 0.8 }
  };

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className='border-4 dark:border-2 border-white rounded-[14px] shadow-lg shadow-[#d6d1f5] dark:border-[#F0F0F0] dark:shadow-none cursor-pointer'
    >
      <img
        alt={`${img.title} Image ${index}`}
        src={img.image}
        className='md:w-[230px] md:h-[330px] xl:w-[220px] xl:h-[330px] xs:w-full object-cover rounded-[14px] shadow-lg shadow-[#d6d1f5] dark:shadow-none hover:scale-105 transition-all duration-300 ease-in-out'
      />
    </motion.div>
  );
};

const FeaturedRight: React.FC<FeaturedLeftProps> = ({ product }) => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  if (windowWidth === undefined || !product) {
    return null;
  }

  return (
    <div className='xl:w-[50%] w-full h-auto relative mt-auto pb-5 xl:pr-20 xl:flex xs:hidden'>
      <div className='flex gap-5 flex-wrap items-center justify-center'>
        {product.additional_images.map((img, index) => {
          if (windowWidth <= 600 && index >= 3) {
            return null;
          }
          return <ImageItem key={index} img={img} index={index} />;
        })}
      </div>
    </div>
  );
}

export default FeaturedRight;
