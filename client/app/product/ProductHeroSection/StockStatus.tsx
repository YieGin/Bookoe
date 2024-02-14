import React from 'react';
import { IoShieldCheckmarkSharp } from 'react-icons/io5';

interface StockStatusProps {
  inStock: boolean;
}

const StockStatus: React.FC<StockStatusProps> = ({ inStock }) => (
  <div className='rounded-[14px] md:px-4 md:py-2 xs:px-3 xs:py-2 h-max flex text-[#6C5DD3] md:bg-[#DDF5E4] md:gap-x-3 xs:gap-x-1 items-center'>
    <IoShieldCheckmarkSharp className='text-[#3EB760] xl:text-[18px] lg:text-[15px] md:hidden lg:flex' />
    <h2 className={`uppercase font-bold xl:text-[18px] lg:text-[15px] xs:text-[14px] font-Cairo ${inStock ? 'text-[#3EB760]' : 'text-[#6C5DD3]'}`}>
      {inStock ? 'In Stocks' : 'Out of Stocks'}
    </h2>
  </div>
);

export default StockStatus;
