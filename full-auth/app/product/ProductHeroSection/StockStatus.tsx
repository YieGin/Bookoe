import React from 'react';
import { IoShieldCheckmarkSharp } from 'react-icons/io5';

interface StockStatusProps {
  inStock: boolean;
}

const StockStatus: React.FC<StockStatusProps> = ({ inStock }) => (
  <div className='rounded-[14px] px-4 py-2 h-max flex text-[#6C5DD3] bg-[#DDF5E4] gap-x-3 items-center cursor-pointer'>
    <IoShieldCheckmarkSharp className='text-[#3EB760] text-[20px]' />
    <h2 className={`uppercase font-bold text-[18px] font-Cairo ${inStock ? 'text-[#3EB760]' : 'text-[#6C5DD3]'}`}>
      {inStock ? 'In Stocks' : 'Out of Stocks'}
    </h2>
  </div>
);

export default StockStatus;
