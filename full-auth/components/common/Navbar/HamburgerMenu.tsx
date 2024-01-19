'use client'
import React, { useEffect, useState } from 'react';
import { IoIosMenu, IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import AuthLinks from './AuthLinks';
import GuestLinks from './GuestLinks';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { fetchFavoritesCount } from '@/redux/features/favoritesCountSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { IoClose } from 'react-icons/io5';

const HamburgerMenu = () => {
    const dispatch = useAppDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isListOpen, setIsListOpen] = useState(false);
    const [logout] = useLogoutMutation();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
    }, [isMenuOpen]);

    useEffect(() => {
        dispatch(fetchFavoritesCount());
    }, [dispatch]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleList = () => setIsListOpen(!isListOpen);

    return (
        <div className='font-Cairo flex items-center justify-center lg:hidden ml-auto'>
            <button onClick={toggleMenu}>
                <IoIosMenu className='dark:text-white text-black' size={40} />
            </button>

            <div className={`fixed top-0 right-0 h-full xs:w-full bg-white dark:bg-[#232323] md:w-[300px] shadow-lg z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} ease-in-out duration-300`}>
                <button onClick={toggleMenu} className="absolute top-4 right-4">
                    <IoClose size={24} color="#000" />
                </button>

                <div className='mt-14'>
                    <SearchBar />
                </div>
                <div className="px-4 flex flex-col h-full">
                    <div className='mt-5'>
                        {isAuthenticated ? <AuthLinks logout={logout} /> : <GuestLinks />}
                    </div>
                    <div onClick={toggleList} className='mt-10 flex gap-x-2 items-center cursor-pointer'>
                        <p className='text-[#6C5DD3] font-bold font-Roboto text-[20px]'>Categories</p>
                        {isListOpen ? <IoIosArrowUp size={18} color="#6C5DD3" /> : <IoIosArrowDown size={18} color="#6C5DD3" />}
                    </div>

                    <ul className={`space-y-3 font-sans text-[#3E3E3E] dark:text-[#d8d8d8] transition-all cursor-pointer duration-300 ease-in-out ${isListOpen ? 'max-h-screen mt-2' : 'max-h-0 overflow-hidden'}`}>
                        <li>Action</li>
                        <li>Fantasy</li>
                        <li>Advanture</li>
                        <li>History</li>
                        <li>Animation</li>
                        <li>Horror</li>
                        <li>Biography</li>
                        <li>Mystery</li>
                        <li>Comedy</li>
                        <li>Romance</li>
                        <li>Crime</li>
                        <li>Sci-fi</li>
                        <li>Documentary</li>
                        <li>Sport</li>
                    </ul>

                    <div className='mt-5'>
                        <div className='text-[#6C5DD3] font-bold font-Roboto text-[20px]'>
                            <Link href='/'>All books</Link>
                        </div>
              
                        <div className='text-[#6C5DD3] font-bold font-Roboto text-[20px] mt-5'>
                            <Link href='/'>Books on Sale</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HamburgerMenu;
