'use client'
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAllProducts } from '@/redux/features/productsSlice';
import { IoIosArrowDown } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { selectSelectedPublishers, setSelectedPublishers } from '@/redux/features/filterSlice';

const Publisher = () => {
    const dispatch = useAppDispatch();
    const allProducts = useAppSelector((state) => state.products.allProducts);
    const globalSelectedPublishers = useAppSelector(selectSelectedPublishers);

    // Function to get initial state from session storage
    const getInitialShowPublisher = () => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('showPublisher') === 'true';
        }
        return false;
    };

    const [showPublisher, setShowPublisher] = useState(getInitialShowPublisher());
    const [uniquePublishers, setUniquePublishers] = useState<Set<string>>(new Set());

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    useEffect(() => {
        const publisherSet = new Set<string>();
        allProducts.forEach(product => {
            if (product.publisher) {
                publisherSet.add(product.publisher);
            }
        });
        setUniquePublishers(publisherSet);
    }, [allProducts]);

    const togglePublisher = () => {
        setShowPublisher(prevShow => {
            const newShow = !prevShow;
            sessionStorage.setItem('showPublisher', newShow.toString());
            return newShow;
        });
    };

    const handlePublisherSelect = (publisher: string) => {
        const newSelected = new Set(globalSelectedPublishers);
        if (newSelected.has(publisher)) {
            newSelected.delete(publisher);
        } else {
            newSelected.add(publisher);
        }
        dispatch(setSelectedPublishers(Array.from(newSelected) as string[]));
    };

    return (
        <div>
            <div className='border-[1px] dark:border-[#5c5c5c] py-2 rounded-[14px] mt-5'>
                <button onClick={togglePublisher} className={`flex justify-between items-center ${showPublisher ? 'border-b-[1px] dark:border-[#5c5c5c]' : 'border-none'} w-full px-5 py-2`}>
                    <h2 className='text-[#11142D] dark:text-[#FFF] font-semibold text-[20px]'>Choose Publisher</h2>
                    <IoIosArrowDown className={`text-[#6C5DD3] dark:text-[#FFF] text-[20px] transform ${showPublisher ? 'rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`} />
                </button>
                <AnimatePresence>
                    {showPublisher && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className='space-y-3 my-5'>
                                {Array.from(uniquePublishers).map((publisher, index) => (
                                    <div className='flex ml-5 items-center gap-x-2' key={index}>
                                        <p className={`font-Cairo cursor-pointer text-[16px] ${globalSelectedPublishers.includes(publisher) ? 'text-[#6C5DD3]' : 'text-[#11142D]'}`}
                                            onClick={() => handlePublisherSelect(publisher)}>
                                            {publisher}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Publisher;
