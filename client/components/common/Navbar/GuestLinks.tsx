// GuestLinks.tsx
import React from 'react';
import Link from 'next/link';
import { IoPersonOutline } from "react-icons/io5";

const GuestLinks: React.FC = () => (
  <div className='ml-5 flex gap-x-5 w-full'>
    <Link href="/auth/login" className="text-[#6C5DD3] bg-[#F0EEFF] rounded-xl text-[18px] px-5 py-[9px] hover:bg-[#dddaf8] font-bold">Log In</Link> 
    <div className='flex px-3 py-2 bg-[#6C5DD3] rounded-xl items-center gap-x-3 hover:bg-[#5342c4] cursor-pointer'>
      <IoPersonOutline className="text-[18px] text-[#fff] xl:flex lg:hidden" />
      <Link href="/auth/register" className="text-[#FFF] text-[18px]">Sign Up</Link>
    </div>
  </div>
);

export default GuestLinks;
