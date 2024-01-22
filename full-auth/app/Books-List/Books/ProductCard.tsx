'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/redux/features/productsSlice';
import { renderStars } from './productUtils';
import { LuHeart } from "react-icons/lu";
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onAddFavorite: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite, onAddFavorite }) => {
  const router = useRouter();
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
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0.8 }
  };

  const navigateToProductPage = () => {
    router.push(`/product/${product.id}`);
  };
  

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className='rounded-[14px] border-[1px] dark:border-[#5c5c5c] p-5 relative lg-md:w-[250px] md:w-[200px]'
    >
      <div 
        onClick={() => onAddFavorite(product.id)} 
        className={`absolute cursor-pointer right-5 top-5 p-2 z-10 rounded-md ${isFavorite ? 'bg-red-700' : 'bg-[#6C5DD3]'} flex items-center justify-center`}
      >
        <LuHeart className='text-[20px] text-white' />
      </div>
      <img onClick={navigateToProductPage} className='lg-md:h-[320px] lg-md:w-[220px] object-cover cursor-pointer rounded-[14px] hover:scale-110 transition-all duration-300 ease-in-out' src={product.image} alt={product.title} />
      <div className='flex flex-col items-center mt-5 gap-y-1'>
        <h1 className='text-[#11142D] dark:text-[#fff] font-bold text-[16px] font-Cairo line-clamp-1'>{product.title}</h1>
        <div className='flex gap-x-2 flex-wrap w-full items-center justify-center'>
          {product.categories.map((category, index) => (
            <p key={index} className='text-[#6C5DD3] dark:text-[#8a7bf0] text-[14px] font-sans'>
              {typeof category === 'string' ? category : category.name}
            </p>
          ))}
        </div>
        <div className='flex gap-x-2 items-center'>
          <p className='text-[#11142D] font-bold text-[20px] dark:text-[#F0F0F0]'>${product.discount}</p>
          <p className='text-[#AAAAAA] font-bold text-[16px] line-through'>${product.price}</p>
        </div>
        <div className='flex gap-x-2 items-center'>
          {renderStars(parseInt(product.stars))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
