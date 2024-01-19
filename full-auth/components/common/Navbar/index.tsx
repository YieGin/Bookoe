// Navbar.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store";
import AuthLinks from './AuthLinks';
import GuestLinks from './GuestLinks';
import SearchBar from './SearchBar';
import LogoDisplay from './LogoDisplay';
import ThemeToggle from './ThemeToggle';
import { fetchFavoritesCount } from '@/redux/features/favoritesCountSlice';
import HamburgerMenu from './HamburgerMenu';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const theme = useSelector((state: RootState) => state.themeMenu.theme);

  useEffect(() => {
    dispatch(fetchFavoritesCount());
  }, [dispatch]);


  return (
    <nav className="bg-white dark:bg-[#181c20] text-white p-4 font-Cairo w-full border-b-[1px] border-[#E1E1E1] dark:border-[#555555]">
      <div className="mx-auto flex xs:justify-between lg:justify-center items-center w-full">
        <LogoDisplay theme={theme} />
        <div className='lg:flex xs:hidden'>
          <SearchBar />
        </div>
        <div className="gap-x-5 flex">
          <div className='md:flex xs:hidden'>
            {isAuthenticated ? <AuthLinks logout={logout} /> : <GuestLinks />}
          </div>
          <ThemeToggle />
          <HamburgerMenu />
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
