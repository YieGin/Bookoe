import { Product } from '@/redux/features/productsSlice';
import React from 'react';
import { BsFillLightningFill } from 'react-icons/bs';

interface ShippingDetailProps {
    product: Product;
}

const ShippingDetail: React.FC<ShippingDetailProps> = ({ product }) => {
  if (product.free_shipping) {
    return (
      <div className='rounded-[14px] md:px-4 md:py-2 xs:px-3 xs:py-2 h-max flex text-[#6C5DD3] md:bg-[#EBE8FE] md:gap-x-3 xs:gap-x-1 items-center'>
        <BsFillLightningFill className='text-[#6C5DD3] xl:text-[20px] lg:text-[15px] md:hidden lg:flex' />
        <h2 className='uppercase text-[#6C5DD3] font-bold xl:text-[18px] lg:text-[15px] font-Cairo'>Free shipping</h2>
      </div>
    );
  } else if (product.in_stock) {
    return (
      <div className='rounded-[14px] md:px-4 md:py-2 xs:px-3 xs:py-2 h-max flex text-[#6C5DD3] md:bg-[#EBE8FE] dark:bg-none md:gap-x-3 xs:gap-x-1 items-center'>
        <BsFillLightningFill className='text-[#6C5DD3] xl:text-[20px] lg:text-[15px] md:hidden lg:flex' />
        <h2 className='uppercase text-[#6C5DD3] font-bold xl:text-[18px] lg:text-[15px] xs:text-[14px] font-Cairo'>shipping {product.shipping_price} $</h2>
      </div>
    );
  }
  return null;
};

export default ShippingDetail;
