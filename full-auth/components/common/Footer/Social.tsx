'use client'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FaFacebook } from 'react-icons/fa';
import { BsInstagram, BsLinkedin, BsTwitter, BsYoutube } from 'react-icons/bs';
import LogoDisplay from '../Navbar/LogoDisplay'
import Link from 'next/link';

const Social = () => {
    const theme = useSelector((state: RootState) => state.themeMenu.theme);

    const socialPlatforms = [
        { id: 'facebook', icon: <FaFacebook className='text-[20px] text-[#1E33E5]' />, bgColor: 'hover:bg-[#adb5fc]', href: 'https://www.facebook.com' },
        { id: 'youtube', icon: <BsYoutube className='text-[20px] text-[#FF2B2B]' />, bgColor: 'hover:bg-[#FFD4D4]', href: 'https://www.youtube.com' },
        { id: 'twitter', icon: <BsTwitter className='text-[20px] text-[#3CB5DB]' />, bgColor: 'hover:bg-[#b2e9fa]', href: 'https://www.twitter.com' },
        { id: 'linkedin', icon: <BsLinkedin className='text-[20px] text-[#286FA3]' />, bgColor: 'hover:bg-[#c4e5fc]', href: 'https://www.linkedin.com' },
        { id: 'instagram', icon: <BsInstagram className='text-[20px] text-[#FD3E77]' />, bgColor: 'hover:bg-[#fccad9]', href: 'https://www.instagram.com' },
    ];

  return (
    <div className='flex flex-col xl:w-[30%] lg:w-[20%]'>
        <LogoDisplay theme={theme} />
        <p className='mt-10 text-[#464B70] dark:text-[#fff] sm:text-[16px] xs:text-[14px] font-sans'>
          At Bookoe, we&apos;re more than just a bookstore. We are a community of book lovers, a platform for literary exploration,
          and a bridge connecting readers to the vast world of knowledge and imagination. Whether you&apos;re in search of the latest bestsellers,
          timeless classics, or undiscovered gems, Bookoe is your destination.
        </p>
        <h2 className='text-[#11142D] dark:text-[#fff] font-bold text-[20px] my-5'>Follow Us</h2>
        <div className='flex gap-x-5'>
            {socialPlatforms.map(platform => (
                <Link key={platform.id} href={platform.href} target="_blank" rel="noopener noreferrer" className={`rounded-lg flex items-center justify-center cursor-pointer p-2 border-2 dark:border-[#2e2e2e] ${platform.bgColor}`}>
                    {platform.icon}
                </Link>
            ))}
        </div>
      </div>
  )
}

export default Social
