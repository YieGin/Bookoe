'use client'
import React, { useState, useEffect } from 'react';
import { Product } from '@/redux/features/productsSlice';

interface FeaturedLeftProps {
  product: Product | null;
}

const FeaturedRight: React.FC<FeaturedLeftProps> = ({ product }) => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Check if window is defined (only available in the browser)
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Render null if windowWidth is undefined (initial render on the server)
  if (windowWidth === undefined) {
    return null;
  }

  return (
    <div className='xl:w-[50%] w-full h-auto relative mt-auto pb-5 xl:pr-20'>
      <div className='flex gap-5 flex-wrap items-center justify-center'>
        {product && product.additional_images.map((img, index) => {
          // Render only the first 3 images if window width is 600px or less
          if (windowWidth <= 600 && index >= 3) {
            return null;
          }
          return (
            <div key={index} className='border-4 dark:border-2 border-white rounded-[14px] shadow-lg shadow-[#d6d1f5] dark:border-[#F0F0F0] dark:shadow-none cursor-pointer'>
              <img
                key={index}
                alt={`${product.title} Image ${index}`}
                src={img.image}
                className='md:w-[230px] md:h-[330px] xl:w-[250px] xl:h-[330px] xs:w-full object-cover rounded-[14px] shadow-lg shadow-[#d6d1f5] dark:shadow-none hover:scale-105 transition-all duration-300 ease-in-out'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeaturedRight;
