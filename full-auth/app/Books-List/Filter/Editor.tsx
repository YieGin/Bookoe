'use client'
import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { FiMinus, FiPlus } from "react-icons/fi";
import { fetchBestSellers, fetchFiveStarProducts, fetchNewestBooks } from '@/redux/features/productsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Editor = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { bestSellerProducts, newestBooks, fiveStarProducts, historyCategoryProducts } = useAppSelector(state => state.products);
  const [showEditor, setEditor] = useState(true);
  const [showBestSellers, setShowBestSellers] = useState(false);
  const [showNewestBooks, setShowNewestBooks] = useState(false);
  const [showFeatured, setShowFeatured] = useState(false);
  const [showWatchHistory, setShowWatchHistory] = useState(false);

  useEffect(() => {
  dispatch(fetchBestSellers());
  dispatch(fetchNewestBooks());
  dispatch(fetchFiveStarProducts());
  }, [dispatch]);

  const toggleBestSellers = () => { setShowBestSellers(prevShow => !prevShow);};
  const toggleNewestBooks = () => { setShowNewestBooks(prevShow => !prevShow);};
  const toggleFeatured = () => { setShowFeatured(prevShow => !prevShow);};
  const toggleWatchHistory = () => { setShowWatchHistory(prevShow => !prevShow);};
  const toggleEditor = () => { setEditor(prevShow => !prevShow);};

  const navigateToProductPage = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div>
      <div className='border-[1px] dark:border-[#5c5c5c] py-2 rounded-[14px] mt-5'>
        <button onClick={toggleEditor} className={`flex justify-between items-center ${showEditor ? 'border-b-[1px] dark:border-[#5c5c5c]' : 'border-none'} w-full px-5 py-2`}>
          <h2 className='text-[#11142D] dark:text-[#FFF] font-semibold text-[20px]'>Editor Picks</h2>
            <IoIosArrowDown className={`text-[#6C5DD3] dark:text-[#FFF] text-[20px] transform ${showEditor ? 'rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`} />
        </button>
      <AnimatePresence>
        {showEditor && (
        <div className='flex flex-col mt-0 px-5'>
          {/* Best Sales */}
          <button onClick={toggleBestSellers} className='flex items-center gap-x-2 mt-5 w-full'>
            {showBestSellers ? (
              <FiMinus className='text-[#6C5DD3] dark:text-[#F0F0F0] text-[15px]' />
            ) : (
              <FiPlus className='text-[#6C5DD3] dark:text-[#F0F0F0] text-[15px]' />
            )}
            <h2 className='text-[#6C5DD3] dark:text-[#F0F0F0] font-Roboto font-bold text-[18px]'>Best Sales</h2>
          </button>
          <AnimatePresence>
            {showBestSellers && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className='space-y-2 mt-2'>
                  {bestSellerProducts.map((item) => (
                    <div onClick={() => navigateToProductPage(item.id)} className='flex ml-5' key={item.id}>
                      <p className='text-[#11142D] dark:text-[#F0F0F0] font-sans text cursor-pointer text-[16px]'>{item.title}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Newest Books */}
          <button onClick={toggleNewestBooks} className='flex items-center gap-x-2 mt-5 w-full'>
            {showNewestBooks ? (
              <FiMinus className='text-[#6C5DD3] dark:text-[#F0F0F0] text-[15px]' />
            ) : (
              <FiPlus className='text-[#6C5DD3] dark:text-[#F0F0F0] text-[15px]' />
            )}
            <h2 className='text-[#6C5DD3] dark:text-[#F0F0F0] font-Roboto font-bold text-[18px]'>Newest Books</h2>
          </button>
          <AnimatePresence>
            {showNewestBooks && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className='space-y-2 mt-2'>
                  {newestBooks.map((item) => (
                    <div onClick={() => navigateToProductPage(item.id)} className='flex ml-5' key={item.id}>
                      <p className='text-[#11142D] dark:text-[#F0F0F0] font-sans text cursor-pointer text-[16px]'>{item.title}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Featured */}
          <button onClick={toggleFeatured} className='flex items-center gap-x-2 mt-5 w-full'>
            {showFeatured ? (
              <FiMinus className='text-[#6C5DD3] dark:text-[#F0F0F0] text-[15px]' />
            ) : (
              <FiPlus className='text-[#6C5DD3] dark:text-[#F0F0F0] text-[15px]' />
            )}
            <h2 className='text-[#6C5DD3] dark:text-[#F0F0F0] font-Roboto font-bold text-[18px]'>Featured</h2>
          </button>
          <AnimatePresence>
            {showFeatured && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className='space-y-2 mt-2'>
                  {fiveStarProducts.map((item) => (
                    <div onClick={() => navigateToProductPage(item.id)} className='flex ml-5' key={item.id}>
                      <p className='text-[#11142D] dark:text-[#F0F0F0] font-sans text cursor-pointer text-[16px]'>{item.title}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Watch History */}
          <button onClick={toggleWatchHistory} className='flex items-center gap-x-2 mt-5 w-full'>
            {showWatchHistory ? (
              <FiMinus className='text-[#6C5DD3] dark:text-[#F0F0F0] text-[15px]' />
            ) : (
              <FiPlus className='text-[#6C5DD3] dark:text-[#F0F0F0] text-[15px]' />
            )}
            <h2 className='text-[#6C5DD3] dark:text-[#F0F0F0] font-Roboto font-bold text-[18px]'>Watch History</h2>
          </button>
          <AnimatePresence>
            {showWatchHistory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className='space-y-2 mt-2'>
                  {historyCategoryProducts.map((item) => (
                    <div onClick={() => navigateToProductPage(item.id)} className='flex ml-5' key={item.id}>
                      <p className='text-[#11142D] dark:text-[#F0F0F0] font-sans text cursor-pointer text-[16px]'>{item.title}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
      </div>
    </div>
  )
}

export default Editor
