'use client'
import React, { useEffect, useState } from 'react';
import { IoIosMenu, IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import AuthLinks from './AuthLinks';
import GuestLinks from './GuestLinks';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { fetchFavoritesCount } from '@/redux/features/favoritesCountSlice';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import { Logo, LogoBlack } from '@/public';

const HamburgerMenu = () => {
    const dispatch = useAppDispatch();
    const theme = useSelector((state: RootState) => state.themeMenu.theme);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isListOpen, setIsListOpen] = useState(false);
    const [logout] = useLogoutMutation();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        dispatch(fetchFavoritesCount());
    }, [dispatch]);


    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleList = () => setIsListOpen(!isListOpen);

    const bookCategories = [
        { name: 'Adventure', href: '/books-list?category=Adventure' },
        { name: 'Animation', href: '/books-list?category=Animation' },
        { name: 'Biography', href: '/books-list?category=Biography' },
        { name: 'Comedy', href: '/books-list?category=Comedy' },
        { name: 'Crime', href: '/books-list?category=Crime' },
        { name: 'Documentary', href: '/books-list?category=Documentary' },
        { name: 'History', href: '/books-list?category=History' },
        { name: 'Horror', href: '/books-list?category=Horror' },
        { name: 'Mystery', href: '/books-list?category=Mystery' },
        { name: 'Romance', href: '/books-list?category=Romance' },
        { name: 'Sci-fi', href: '/books-list?category=Sci-fi' },
        { name: 'Sport', href: '/books-list?category=Sport' },
    ];

    const containerHeight = isListOpen == true ? 'h-screen' : 'h-full';

    return (
      <div className={`font-Cairo flex items-center justify-center lg:hidden ml-auto `}>
        <button onClick={toggleMenu}>
          <IoIosMenu className='dark:text-white text-black' size={40} />
        </button>
      <div className={`fixed top-0 right-0 bg-white dark:bg-[#11161b] md:w-[300px]  h-full shadow-lg z-40 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} ease-in-out duration-300 overflow-y-auto overflow-x-hidden`}>
        {theme === "dark" ? (
          <Image className='object-cover m-5' loading="lazy" src={LogoBlack} alt="Logo" width={200} height={50} />
          ) : (
          <Image className='object-cover m-5' loading="lazy" src={Logo} alt="Logo" width={200} height={50} />
        )}
        <button onClick={toggleMenu} className="absolute top-4 right-4">
          <IoClose className='text-black dark:text-white' size={24} />
        </button>
        <div className='mt-14'>
          <SearchBar />
        </div>
        <div className="px-4 flex flex-col h-full">
            <div className='mt-5'>
                {isAuthenticated ? <AuthLinks logout={logout} /> : <GuestLinks />}
            </div>
            <div className='my-5'>
              <div className='text-[#6C5DD3] dark:text-[#7381fc] font-bold font-Roboto text-[20px]'>
                <Link href='/books-list'>All books</Link>
              </div>
            </div>
            <div onClick={toggleList} className=' flex gap-x-2 items-center cursor-pointer'>
              <p className='text-[#6C5DD3] dark:text-[#7381fc] font-bold font-Roboto text-[20px]'>Categories</p>
              {isListOpen ? <IoIosArrowUp size={18} color="#7381fc" /> : <IoIosArrowDown size={18} color="#7381fc" />}
            </div>

            <ul className={`space-y-3 font-sans text-[#3E3E3E] dark:text-[#d8d8d8] ${isListOpen ? 'max-h-screen mt-2' : 'max-h-0 overflow-hidden'}`}>
              {bookCategories.map((category, index) => (
                <li className='hover:bg-gray-100 dark:hover:bg-gray-900 px-5 py-3' key={index}>
                  <Link href={category.href}>
                    <p className='font-bold text-[#464B70] dark:text-white'>{category.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </div>
    );
}

export default HamburgerMenu;
