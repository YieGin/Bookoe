import React from 'react';
import { BsCake2Fill } from 'react-icons/bs';
import { FaBabyCarriage, FaBreadSlice } from 'react-icons/fa';
import { SiBoost } from "react-icons/si";

const Ads = () => {

  const AdsList = [
    { title: 'Bread.com', icon: FaBreadSlice },
    { title: 'Boost.com', icon: SiBoost },
    { title: 'BEBY.com', icon: FaBabyCarriage },
    { title: 'Quena.com', icon: BsCake2Fill },
  ];

  return (
    <div className='xl:p-20 lg:p-10 xs:p-5 lg:gap-28 xs:gap-5 mt-20 flex items-center justify-center font-Rubik bg-[#F0EEFF] dark:bg-[#11161b]'>
      {AdsList.map((item, index) => (
        <div key={index} className='flex items-center lg:gap-5 xs:gap-1'>
          <item.icon className='text-[#aaa] dark:text-[#fff] lg:text-[60px] md:text-[30px] xs:hidden md:flex' />
          <p className='text-[#aaa] dark:text-[#fff] xl:text-[40px] lg:text-[30px] xs:text-[12px] sm:text-[17px] md:text-[20px] font-bold'>{item.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Ads;
