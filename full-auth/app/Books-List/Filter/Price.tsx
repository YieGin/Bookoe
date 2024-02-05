'use client'
import { selectMaxPrice, selectMinPrice, setMaxPrice, setMinPrice } from '@/redux/features/filterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const Price = () => {
    const dispatch = useAppDispatch();
    const globalMinPrice = useAppSelector(selectMinPrice);
    const globalMaxPrice = useAppSelector(selectMaxPrice);
    const [showPrice, setShowPrice] = useState(false);
    const [minPrice, setLocalMinPrice] = useState(0);
    const [maxPrice, setLocalMaxPrice] = useState(1000);

    useEffect(() => {
        setLocalMinPrice(globalMinPrice);
        setLocalMaxPrice(globalMaxPrice);
    }, [globalMinPrice, globalMaxPrice]);
    const togglePrice = () => setShowPrice(prevShow => !prevShow);

    const handleMinPriceChange = (value: number) => {
        setLocalMinPrice(value);
        dispatch(setMinPrice(value));
    };

    const handleMaxPriceChange = (value: number) => {
        setLocalMaxPrice(value);
        dispatch(setMaxPrice(value));
    };
    return (
        <div>
            <div className="border-[1px] dark:border-[#5c5c5c] py-2 rounded-[14px] mt-5">
                <button
                    onClick={togglePrice}
                    className={`flex justify-between items-center ${
                        showPrice ? 'border-b-[1px] dark:border-[#5c5c5c]' : 'border-none'
                    } w-full px-5 py-2`}
                >
                    <h2 className="text-[#11142D] dark:text-[#FFF]  font-semibold text-[20px]">Price Range</h2>
                    <IoIosArrowDown
                        className={`text-[#6C5DD3] dark:text-[#FFF]  text-[20px] transform ${
                            showPrice ? 'rotate-180' : 'rotate-0'
                        } transition-transform duration-300 ease-in-out`}
                    />
                </button>
                {showPrice && (
                    <div className="px-5 py-2">
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={minPrice}
                            onChange={(e) => handleMinPriceChange(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#F0F0F0] dark:text-[#fff] range_slider"
                        />
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={maxPrice}
                            onChange={(e) => handleMaxPriceChange(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 text-green-500 rounded-lg appearance-none cursor-pointer dark:bg-[#F0F0F0] range_slider"
                        />
                        <div className="flex justify-between text-[#11142D] dark:text-[#fff] ">
                            <span>${minPrice}</span>
                            <span>${maxPrice}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Price;
