'use client'
import { motion, useAnimation, Variants } from 'framer-motion';
import { Product, fetchBestSellers, fetchProductById } from '@/redux/features/productsSlice';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

const ProductItem: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const dispatch = useAppDispatch();
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
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: index * 0.2 } },
    hidden: { opacity: 0, scale: 0.8 }
  };

  const navigateToProductPage = async (productId: number) => {
    try {
      await dispatch(fetchProductById(productId)).unwrap();
      router.push(`/product/${productId}`);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
    }
  };

  return (
    <motion.div 
      onClick={() => navigateToProductPage(product.id)}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="md:min-w-[140px] xs:h-[150px] md:h-[250px] cursor-pointer shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out"
    >
      <img src={`${process.env.NEXT_PUBLIC_HOST}${product.image}`} alt={product.title} className="w-full h-full object-cover hover:scale-105 lg:brightness-100 hover:brightness-105 transition-all duration-300 ease-in-out" />
    </motion.div>
  );
};

const PopularContent = () => {
  const dispatch = useAppDispatch();
  const bestSellers = useAppSelector((state) => state.products.bestSellerProducts);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(fetchBestSellers());
  }, [dispatch]);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);

    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  useEffect(() => {
    let numberToShow: number;
    if (screenWidth <= 390) {
      numberToShow = 2;
    } else if (screenWidth <= 550) {
      numberToShow = 3;
    } else {
      numberToShow = 4;
    }
    setVisibleProducts(bestSellers.slice(0, numberToShow));
  }, [screenWidth, bestSellers]);

  return (
    <div className="flex gap-x-5">
      <div className="relative flex gap-x-5 items-center justify-center w-full mt-5">
        {visibleProducts.map((product, index) => (
          <ProductItem key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PopularContent;
