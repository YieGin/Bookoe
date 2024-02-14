'use client'
import React, {useEffect} from 'react';
import { fetchProductById, Product } from '@/redux/features/productsSlice';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { addToCart } from '@/redux/features/cartSlice';
import { fetchCartCount } from '@/redux/features/cartCountSlice';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import Link from 'next/link';
import { PiBooksDuotone } from 'react-icons/pi';

interface FeaturedLeftProps {
  product: Product | null;
}

const FeaturedLeft: React.FC<FeaturedLeftProps> = ({ product }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  const variants: Variants = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0.8 }
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ id: product.id, quantity: 1 }))
        .then(() => dispatch(fetchCartCount()));
    }
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
    <div className='xl:w-[50%] mb-5'>
      <div className='md:mt-24 xs:mt-5'>
        <h1 className='text-[#11142D] dark:text-[#F0F0F0] font-bold sm:text-[35px] md:ml-10 relative'>Featured Books</h1>
        <p className="sm:text-[14px] xs:text-[10px] relative font-sans leading-6 text-[#11142D] dark:text-[#F0F0F0] mt-4 lg:w-[80%] sm:w-[90%] xs:w-[100%] md:ml-10">
            Discover books you&apos;ll love with Bookoe&apos;s personalized recommendations. Our Recommended For You section is tailored
            to match your reading tastes, offering a selection of stories that resonate with your interests. From thrilling
            adventures to captivating narratives, find your next favorite read, handpicked just for you. Explore, enjoy, and dive into
            a world of books curated for your unique journey with Bookoe.
        </p>
      </div>
      <div className='w-full h-max bg-white dark:bg-[#232323] rounded-[14px] shadow-lg shadow-[#d6d1f5] dark:shadow-md dark:shadow-[#1d1d1d] flex py-7 md:px-5 xs:px-3 md:mt-20 xs:mt-5 relative'>
        {product && (
        <div className='flex md:gap-x-5' key={product.id}>
            <motion.img
              onClick={() => navigateToProductPage(product.id)}
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={variants}
              src={product.image}
              alt={product.title}
              className='md:w-[250px] md:h-[400px] cursor-pointer object-cover xs:w-[100px] xs:h-[150px] rounded-[14px] md:flex xs:hidden'
            />
            <div className='md:ml-5'>
              <div className='flex gap-x-5 h-max items-center'>
                <PiBooksDuotone className='text-[30px] text-[#6C5DD3]' />
                <div className='flex flex-col'>
                  <h1 className='text-[#11142D] dark:text-[#F0F0F0] font-bold lg:text-[30px]'>{product.title}</h1>
                  <div className='flex gap-x-2'>
                    {product.categories.map((category, index) => {
                      const categoryName = typeof category === 'string' ? category : category.name;
                      return (
                        <Link
                          href={`/books-list?category=${encodeURIComponent(categoryName)}`}
                          key={index}
                          className='rounded-[16px] text-[#6C5DD3] font-sans flex'
                        >
                          {categoryName}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
                <p className='text-[#11142D] dark:text-[#F0F0F0] font-semibold text-[18px] font-sans mt-5'>Synopsis</p>
                <p className='text-[#11142D] dark:text-[#F0F0F0] sm:text-[14px] xs:text-[11px] mt-5 xs:line-clamp-6 md:line-clamp-none'>{product.description}</p>
                <div className='flex gap-x-10 mt-5'>
                  <div className=''>
                    <p className='text-[#AAAAAA] dark:text-[#F0F0F0] sm:text-[14px] xs:text-[10px] font-sans'>Writen by</p>
                    <p className='text-[#11142D] dark:text-[#fff] md:text-[18px] xs:text-[12px] font-semibold font-sans'>{product.author}</p>
                  </div>
                  <div>
                    <p className='text-[#AAAAAA] dark:text-[#F0F0F0] sm:text-[14px] xs:text-[10px] font-sans'>Year</p>
                    <p className='text-[#11142D] dark:text-[#fff] md:text-[18px] xs:text-[12px] font-semibold font-sans'>{product.published_year}</p>
                  </div>
                  </div>
                  <div className='flex items-center justify-between mt-5'>
                    <div className='flex gap-x-3 items-center'>
                      <p className='font-bold text-[#11142D] dark:text-[#F0F0F0] sm:text-[28px] xs:text-[20px] font-Cairo'>${product.discount}</p>
                      <p className='font-semibold text-[#AAAAAA] sm:text-[20px] xs:text-[14px] font-Cairo line-through'>${product.price}</p>
                    </div>
                    <button 
                      onClick={handleAddToCart}
                      className='button px-3'
                    >
                      <MdOutlineShoppingCart className='text-white md:text-[20px] font-bold xs:text-[15px]' />
                      <p className='text-white md:text-[18px] font-bold font-Cairo xs:text-[15px]'>Add to cart</p>
                    </button>
                  </div>
                </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeaturedLeft
