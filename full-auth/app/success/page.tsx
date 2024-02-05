'use client';
import React, { useEffect } from 'react';
import { PiSealCheckFill } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCheckoutData } from '@/redux/features/cartSlice';
import Link from 'next/link';
import Image from 'next/image';
import { Logo, LogoBlack } from '@/public';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Success = () => {
  const dispatch = useAppDispatch();
  const fetchedCheckoutData = useAppSelector((state) => state.cart.fetchedCheckoutData);
  const theme = useSelector((state: RootState) => state.themeMenu.theme);

  useEffect(() => {
    dispatch(fetchCheckoutData());
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="h-screen flex flex-wrap items-center dark:bg-[#11161b] font-Cairo xl:px-72 lg:px-24 md:px-10 xs:px-5">
      <div className='md:w-1/2 xs:w-full'>
        {theme === "dark" ? (
          <Image className='mb-5' src={LogoBlack} alt="Logo" width={200} height={200} />
        ) : (
          <Image className='mb-5' src={Logo} alt="Logo" width={200} height={200} />
        )}
        <h1 className='lg:text-[40px] font-bold text-[#11142D] dark:text-[#FFF] w-[70%]'>Payment confirmed Successful!</h1>
        <p className='text-[#555555] dark:text-[#a5a5a5] font-semibold lg:w-[45%] my-5'>
          Thank you for choosing to book with Bookoe Your reservation is confirmed. if there&apos;s anything you need before your arrival,
          please don&apos;t hesitate to reach out to your host!
        </p>
        <div className='flex gap-x-10'>
          <Link href={'/books-list'} className='font-bold text-[#11142D] hover:text-[#7381fc] dark:text-white underline underline-offset-2 lg:text-[20px] xs:text-[14px] sm:text-[18px]'>Go back to books-list.</Link>
          <Link href={'/'} className='font-bold text-[#11142D] dark:text-white hover:text-[#7381fc] underline underline-offset-2 lg:text-[20px] xs:text-[14px] sm:text-[18px]'>Go back to home</Link>
        </div>
      </div>
      {fetchedCheckoutData && (
      <div className='flex flex-col gap-y-5 md:w-1/2 xs:w-full'>
        <div className='shadow-lg flex justify-between md:p-10 xs:p-4 rounded-[14px] lg:w-[600px]'>
          <div>
            <p className='lg:text-[40px] md:text-[30px] font-bold text-[#11142D] dark:text-[#FFF]'>${fetchedCheckoutData.total_amount.toFixed(2)}</p>
            <p className='text-[#555555] font-semibold'>Payment success!</p>
          </div>
          <PiSealCheckFill className='text-[40px] text-[#11142D] dark:text-[#FFF]' />
        </div>
        <div className='shadow-lg flex flex-col justify-between md:p-10 xs:p-4 rounded-[14px] lg:w-[600px]'>
          <h1 className='lg:text-[30px] font-bold text-[#11142D] dark:text-[#FFF]'>Payment Details</h1>
          <div className='flex justify-between items-center mt-5'>
            <p className='text-[#555555] dark:text-[#a5a5a5] font-semibold xs:text-[12px] sm:text-[14px]'>Date</p>
            <p className='text-[#11142D] dark:text-[#fff] font-semibold lg:text-[20px] md:text-[14px] xs:text-[12px] sm:text-[14px]'>{formatDate(fetchedCheckoutData.created_at)}</p>
          </div>

          <div className='flex justify-between items-center mt-5'>
              <p className='text-[#555555] dark:text-[#a5a5a5] font-semibold xs:text-[12px] sm:text-[14px]'>Amount</p>
              <p className='text-[#11142D] dark:text-[#fff] font-semibold lg:text-[20px] md:text-[14px]'>${fetchedCheckoutData.total_amount.toFixed(2)}</p>
            </div>
            <div className='flex justify-between items-center mt-5'>
              <p className='text-[#555555] dark:text-[#a5a5a5] font-semibold xs:text-[12px] sm:text-[14px]'>Payment Method</p>
              <p className='text-[#11142D] dark:text-[#fff] font-semibold lg:text-[20px] md:text-[14px]'>card</p>
            </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Success;
