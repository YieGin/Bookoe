'use client';
import React, { useEffect, useState, FC } from 'react';
import Link from 'next/link';
import { CiHeart } from 'react-icons/ci';
import { MdLogout, MdOutlineShoppingCart } from 'react-icons/md';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { logout as setLogout } from '@/redux/features/authSlice';
import { fetchFavoritesCount } from '@/redux/features/favoritesCountSlice';
import { IoPersonOutline } from 'react-icons/io5';
import { fetchCartCount } from '@/redux/features/cartCountSlice';
import GuestLinks from './GuestLinks';

interface AuthLinksProps {
  logout: (arg?: any) => Promise<any>;
}


const AuthLinks: FC<AuthLinksProps> = ({ logout }) => {
  const dispatch = useAppDispatch();
  const favoriteCount = useAppSelector((state) => state.favoritesCount.count);
  const cartCount = useAppSelector((state) => state.cartCount.count);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setLogout());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    dispatch(fetchFavoritesCount());
    dispatch(fetchCartCount());
  }, [dispatch]);

  return (
    <div className='lg:ml-5 flex xs:justify-between md:justify-normal gap-x-5 w-full'>
    <Link 
      href="/favorites" 
      className="relative text-[#6C5DD3] bg-[#FFF] rounded-xl border-[1px] text-[18px] px-3 py-[9px] hover:bg-[#dddaf8] font-bold flex items-center group">
      <CiHeart size={24} className="text-[#11142D]" />
      <span className="absolute top-[-5px] right-[-10px] font-sans inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-[#FF754C] rounded-full">{favoriteCount}</span>
      <span className="absolute top-full left-0 mt-1 hidden group-hover:block bg-[#232323] text-[#fff] text-xs rounded px-2 py-1 whitespace-nowrap">
        View Favorites
      </span>
    </Link>
    <Link 
      href="/cart" 
      className="relative text-[#6C5DD3] bg-[#FFF] rounded-xl border-[1px] text-[18px] px-3 py-[9px] hover:bg-[#dddaf8] font-bold flex items-center group">
      <MdOutlineShoppingCart size={24} className="text-[#11142D]" />
      <span className="absolute top-[-5px] right-[-10px] font-sans inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-[#FF754C] rounded-full">{cartCount}</span>
      <span className="absolute top-full left-0 mt-1 hidden group-hover:block bg-[#232323] text-[#fff] text-xs rounded px-2 py-1 whitespace-nowrap">
        Go to Cart
      </span>
    </Link>
    <Link 
      href="/profile" 
      className="relative text-[#6C5DD3] bg-[#FFF] rounded-xl border-[1px] text-[18px] px-3 py-[9px] hover:bg-[#dddaf8] font-bold flex items-center group">
      <IoPersonOutline size={24} className="text-[#11142D]" />
      <span className="absolute top-full left-0 mt-1 hidden group-hover:block bg-[#232323] text-[#fff] text-xs rounded px-2 py-1 whitespace-nowrap">
        View Profile
      </span>
    </Link>
    <div 
      onClick={handleLogout}
      className="relative text-[#6C5DD3] cursor-pointer bg-[#FFF] rounded-xl border-[1px] text-[18px] px-3 py-[9px] hover:bg-[#dddaf8] font-bold flex items-center group">
      <MdLogout size={24} className="text-[#11142D]" />
      <span className="absolute top-full left-0 mt-1 hidden group-hover:block bg-[#232323] text-[#fff] text-xs rounded px-2 py-1 whitespace-nowrap">
        Logout
      </span>
    </div>
    <GuestLinks />
  </div>
  
  );
};

export default AuthLinks;
