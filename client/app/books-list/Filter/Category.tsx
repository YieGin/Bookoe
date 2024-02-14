'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { IoIosArrowDown } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCheckbox } from 'react-icons/io5';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

const Category = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialCategory = searchParams.get('category');
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [showCategory, setShowCategory] = useState(true);

    useEffect(() => {
        if (selectedCategory) {
            const newSearchParams = new URLSearchParams();
            newSearchParams.set('category', selectedCategory);
            router.push(`/books-list?${newSearchParams.toString()}`);
        }
    }, [selectedCategory, router]);

    const handleCategorySelect = (category: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (selectedCategory === category) {
            newSearchParams.delete('category'); // Remove the category parameter
            setSelectedCategory(''); // Clear the selected category state
        } else {
            newSearchParams.set('category', category); // Set the new category
            setSelectedCategory(category); // Update the selected category state
        }
        // Maintain the year filter if it exists
        const year = searchParams.get('year');
        if (year) {
            newSearchParams.set('year', year);
        }
        router.push(`/books-list?${newSearchParams.toString()}`);
    };

    const categories = [
        'Action', 'Fantasy', 'Adventure', 'History', 'Animation', 
        'Horror', 'Biography', 'Mystery', 'Comedy', 'Romance', 
        'Crime', 'Sci-fi', 'Documentary', 'Sport'
    ];

    const toggleCategory = () => setShowCategory(prevShow => !prevShow);

    return (
        <div>
            <div className='border-2 dark:border-[#5c5c5c] py-2 rounded-[14px] mt-5'>
                <button onClick={toggleCategory} className={`flex justify-between items-center ${showCategory ? 'border-b-2 dark:border-[#5c5c5c]' : 'border-none'} w-full px-5 py-2`}>
                    <h2 className='text-[#11142D] dark:text-[#FFF] font-semibold text-[20px]'>Shop by Category</h2>
                    <IoIosArrowDown className={`text-[#6C5DD3] dark:text-[#FFF] text-[20px] transform ${showCategory ? 'rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`} />
                </button>
                <AnimatePresence>
                    {showCategory && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className='my-5 ml-5 grid grid-cols-2 gap-y-4 gap-x-5'>
                                {categories.map(category => (
                                    <div className='flex items-center gap-x-2' key={category}>
                                        <span onClick={() => handleCategorySelect(category)}>
                                            {selectedCategory === category ? (
                                                <IoCheckbox className='text-[24px] cursor-pointer text-[#6C5DD3] dark:text-[#F0F0F0]' />
                                            ) : (
                                                <MdCheckBoxOutlineBlank className='text-[24px] cursor-pointer text-[#6C5DD3] dark:text-[#F0F0F0]' />
                                            )}
                                        </span>
                                        <p className='text-[#11142D] dark:text-[#F0F0F0] font-sans text cursor-pointer text-[16px]' onClick={() => handleCategorySelect(category)}>{category}</p>
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

export default Category;
