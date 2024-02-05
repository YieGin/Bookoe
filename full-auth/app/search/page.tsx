'use client'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProductById, fetchProductsBySearchTerm } from '@/redux/features/productsSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { GoBookmarkSlashFill } from "react-icons/go";
import Link from 'next/link';
import { Spinner } from '@/components/common';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { addToCart } from '@/redux/features/cartSlice';
import { fetchCartCount } from '@/redux/features/cartCountSlice';
import { MdOutlineShoppingCart } from 'react-icons/md';

const SpecialOfferItem: React.FC<{ item: any; index: number }> = ({ item, index }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView]);

  const variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.4 } },
    hidden: { opacity: 0, y: 20 },
  };

  const navigateToProductPage = async (productId: number) => {
    try {
      await dispatch(fetchProductById(productId)).unwrap();
      router.push(`/product/${productId}`);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ id: item.id, quantity: 1 }))
      .then(() => dispatch(fetchCartCount()));
  };  

return (
  <motion.div
    className="flex flex-col rounded-[14px] md:w-[30%] lg:w-[30%] xl:w-[20%]" 
    ref={ref}
    initial="hidden"
    animate={controls}
    variants={variants}
    >
      <img onClick={() => navigateToProductPage(item.id)} className='h-[250px] w-full object-cover rounded-[14px] relative top-5 cursor-pointer' src={item.image} alt={item.image} />
      <div className='border-2 dark:border-[#313131] md:pb-10 xs:pb-5 px-5 font-Cairo rounded-[14px]'>
        <h1 className='md:mt-10 xs:mt-6 font-bold md:text-[20px] xs:text-[20px] text-[#11142D] dark:text-[#F0F0F0] line-clamp-1'>{item.title}</h1>
        <div className='flex  md:gap-2 xs:gap-1 md:my-5 xs:my-3 line-clamp-1'>
          {item.categories.map((category: any, index: any) => (
            <button key={index} className='rounded-[14px] bg-[#F0EEFF] hover:bg-[#ddd8fc] text-[#6C5DD3] xs:px-5 lg:px-5 lg-md:px-2 py-1 font-semibold font-sans delay-100 xs:text-[13px] line-clamp-1'>
              {typeof category === 'string' ? category : category.name}
            </button>
          ))}
        </div>
        <p className='font-sans sm:text-[16px] xs:text-[12px] text-[#000] dark:text-[#F0F0F0] sm:w-[80%] line-clamp-2'>{item.description}</p>
        <p className='md:my-5 xs:my-2 font-semibold text-[16px] text-[#11142D] dark:text-[#F0F0F0] font-sans'>{item.author}</p>
        <div className='flex justify-between'>
          <button onClick={handleAddToCart} className='button xs:px-2'>
            <MdOutlineShoppingCart className='lg-md:text-[14px] md:text-[14px] xl:text-[18px] md:hidden lg-md:flex' color="#FFFFFF" />
            <p className='text-white font-bold xs:text-[10px] sm:text-[14px] lg-md:text-[14px] xl:text-[11px] md:text-[10px]'>Add to cart</p>
          </button>
          <div className='flex items-center justify-center lg:gap-x-5 xl:gap-x-2 lg-md:gap-x-1 xs:gap-x-2 sm:gap-x-2'>
            <p className='font-bold sm:text-[28px] xl:text-[20px] md:text-[14px] lg-md:text-[20px] text-[#11142D] dark:text-[#FFF]'>$ {item.discount}</p>
            <p className='text-[#AAAAAA] font-bold text-[18px] md:text-[14px] line-through'>{item.price}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SearchResultsPage = () => {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector((state) => state.products.searchResults);
  const searchParams = useSearchParams();
  const isLoading = useAppSelector((state) => state.products.isLoading);
  
  useEffect(() => {
    const queryParams = searchParams.get("query");
    if (typeof queryParams === "string") {
      dispatch(fetchProductsBySearchTerm(queryParams));
    }
  }, [searchParams, dispatch]);

  return (
    <div className='dark:bg-[#11161b] pb-20'>
      <h1 className='font-bold text-[40px] font-Rubik pl-10 pt-10 dark:text-white'>Search bar</h1>
      <hr className="border-0 h-0 bg-transparent md:my-10 xs:my-5" style={{ borderStyle: 'dotted', borderWidth: '2px', borderColor: '#ABABAB', borderSpacing: '44px' }} />
      <div className='flex flex-wrap items-center gap-10 justify-center w-full font-Cairo xl:px-44 lg:px-24 md:px-0 xs:px-5'>
        {isLoading ? (
          <div className='h-screen flex items-center justify-center'>
            <Spinner lg />
          </div>
        ) : searchResults.length > 0 ? (
          searchResults.map((item, index) => (
            <SpecialOfferItem key={item.id} item={item} index={index} />
          ))
        ) : (
        <div className='h-screen flex flex-col items-center justify-center xs:px-5 dark:bg-[#11161b]'>
          <GoBookmarkSlashFill className='text-[#ABABAB] text-[40px] mb-5' />
          <h1 className='text-[30px] font-bold font-Rubik text-[#11142D] dark:text-[#FFF]'>No Results Found.</h1>
          <p 
            className='md:text-[20px] xs:text-[15px] font-sans dark:text-[#ABABAB] text-[#ABABAB] text-center'>
            We couldn’t find any products matching your search. Try different keywords or explore our 
            <Link className='text-[#6C5DD3] ml-1 dark:text-[#7381fc] underline-offset-1 underline' href={'/books-list'}>books-list</Link> for more options.
          </p>
        </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
