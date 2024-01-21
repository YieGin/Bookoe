'use client'
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectSelectedCategories, setSelectedCategories } from '@/redux/features/filterSlice';
import { IoIosArrowDown } from 'react-icons/io';
import { IoCheckbox } from 'react-icons/io5';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';


const Category = () => {
    const dispatch = useAppDispatch();
    const globalSelectedCategories = useAppSelector(selectSelectedCategories);
    const [showCategory, setShowCategory] = useState(true);
    const [selectedCategories, setSelectedCategoriesState] = useState<string[]>(globalSelectedCategories);

    useEffect(() => {
        // Update local state only when global state changes
        if (JSON.stringify(globalSelectedCategories) !== JSON.stringify(selectedCategories)) {
            setSelectedCategoriesState(globalSelectedCategories);
        }
    }, [globalSelectedCategories]);

    useEffect(() => {
        // Update global state only when local state changes
        if (JSON.stringify(globalSelectedCategories) !== JSON.stringify(selectedCategories)) {
            dispatch(setSelectedCategories(selectedCategories));
        }
    }, [selectedCategories, dispatch]);

    const handleCategorySelect = (category: string) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(cat => cat !== category)
            : [...selectedCategories, category];
        setSelectedCategoriesState(updatedCategories);
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
                                    {selectedCategories.includes(category) ? (
                                        <IoCheckbox className='text-[24px] cursor-pointer text-[#6C5DD3] dark:text-[#F0F0F0]' onClick={() => handleCategorySelect(category)} />
                                    ) : (
                                        <MdCheckBoxOutlineBlank className='text-[24px] cursor-pointer text-[#6C5DD3] dark:text-[#F0F0F0]' onClick={() => handleCategorySelect(category)} />
                                    )}
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