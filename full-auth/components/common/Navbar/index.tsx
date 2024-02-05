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
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    dispatch(fetchFavoritesCount());
  }, [dispatch]);

  useEffect(() => {
    const navbarElement = document.querySelector('nav');
    if (navbarElement) {
      setNavbarHeight(navbarElement.clientHeight);
    }
  }, []);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);


  return (
    <nav style={{ top: showNav ? '0' : `-${navbarHeight}px` }} className="bg-white dark:bg-[#11161b] text-white p-4 font-Cairo w-full border-b-[1px] z-50 border-[#E1E1E1] dark:border-[#555555] sticky top-0 right-0 transition-top duration-500">
      <div className="mx-auto flex xs:justify-between lg:justify-center items-center w-full">
        <LogoDisplay theme={theme} />
        <div className='lg:flex xs:hidden'>
          <SearchBar />
        </div>
        <div className="gap-x-5 flex h-full">
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
