'use client';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoCheckbox } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setYearFilter, selectYearFilter } from '@/redux/features/filterSlice';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { useRouter, useSearchParams } from 'next/navigation';

const Year = () => {
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialYear = searchParams.get('year');
    const [selectedYear, setSelectedYear] = useState(initialYear);
    const [showYear, setShowYear] = useState(false);

    useEffect(() => {
        if (selectedYear) {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('year', selectedYear);
            router.push(`/books-list?${newSearchParams.toString()}`);
        }
    }, [selectedYear, router]);

    const toggleYear = () => setShowYear(prevShow => !prevShow);

    const handleYearSelect = (year: number) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (selectedYear === year.toString()) {
            newSearchParams.delete('year'); // Remove the year parameter
            setSelectedYear(''); // Clear the selected year state
        } else {
            newSearchParams.set('year', year.toString()); // Set the new year
            setSelectedYear(year.toString()); // Update the selected year state
        }
        // Maintain the category filter if it exists
        const category = searchParams.get('category');
        if (category) {
            newSearchParams.set('category', category);
        }
        router.push(`/books-list?${newSearchParams.toString()}`);
    };

    const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];

    return (
        <div>
            <div className='border-[1px] dark:border-[#5c5c5c] py-2 rounded-[14px] mt-5'>
                <button onClick={toggleYear} className={`flex justify-between items-center ${showYear ? 'border-b-[1px] dark:border-[#5c5c5c]' : 'border-none'} w-full px-5 py-2`}>
                    <h2 className='text-[#11142D] dark:text-[#FFF] font-semibold text-[20px]'>Select Year</h2>
                    <IoIosArrowDown className={`text-[#6C5DD3] dark:text-[#FFF] text-[20px] transform ${showYear ? 'rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`} />
                </button>
                <AnimatePresence>
                    {showYear && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ul className='space-y-2 my-3 ml-5 grid grid-cols-2 gap-y-4 gap-x-5'>
                                {years.map(year => (
                                    <div className='flex items-center gap-x-2' key={year}>
                                        {selectedYear === year.toString() ? (
                                            <IoCheckbox className='text-[24px] cursor-pointer text-[#6C5DD3] dark:text-[#F0F0F0]' onClick={() => handleYearSelect(year)} />
                                        ) : (
                                            <MdCheckBoxOutlineBlank className='text-[24px] cursor-pointer text-[#6C5DD3] dark:text-[#F0F0F0]' onClick={() => handleYearSelect(year)} />
                                        )}
                                        <p 
                                            className='text-[#11142D] dark:text-[#F0F0F0] font-sans text cursor-pointer text-[16px]'
                                            onClick={() => handleYearSelect(year)}
                                        >
                                            {year}
                                        </p>
                                    </div>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}    

export default Year;