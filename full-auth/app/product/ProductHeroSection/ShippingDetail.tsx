import { Product } from '@/redux/features/productsSlice';
import React from 'react';
import { BsFillLightningFill } from 'react-icons/bs';

interface ShippingDetailProps {
    product: Product;
}

const ShippingDetail: React.FC<ShippingDetailProps> = ({ product }) => {
  if (product.free_shipping) {
    return (
      <div className='rounded-[14px] px-4 py-2 h-max flex text-[#6C5DD3] bg-[#EBE8FE] gap-x-3 items-center'>
        <BsFillLightningFill className='text-[#6C5DD3] text-[20px]' />
        <h2 className='uppercase text-[#6C5DD3] font-bold text-[18px] font-Cairo'>Free shipping</h2>
      </div>
    );
  } else if (product.in_stock) {
    return (
      <div className='rounded-[14px] px-4 py-2 h-max flex text-[#6C5DD3] bg-[#EBE8FE] gap-x-3 items-center'>
        <BsFillLightningFill className='text-[#6C5DD3] text-[20px]' />
        <h2 className='uppercase text-[#6C5DD3] font-bold text-[18px] font-Cairo'>shipping {product.shipping_price} $</h2>
      </div>
    );
  }
  return null;
};

export default ShippingDetail;
