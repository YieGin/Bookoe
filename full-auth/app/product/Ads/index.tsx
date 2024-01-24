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
    <div className='p-20 gap-28 my-32 flex items-center justify-center font-Rubik bg-[#F0EEFF]'>
      {AdsList.map((item, index) => (
        <div key={index} className='flex items-center gap-5'>
          <item.icon className='text-[#aaa] text-[60px]' />
          <p className='text-[#aaa] text-[40px] font-bold'>{item.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Ads;
