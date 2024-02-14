import React from 'react';
import ShippingDetail from './ShippingDetail';
import StockStatus from './StockStatus';
import { Product } from '@/redux/features/productsSlice';

interface ProductInfoProps {
    product: Product;
  }

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className='flex xl:gap-x-5 xs:gap-x-2 items-center'>
      <ShippingDetail product={product} />
      <StockStatus inStock={product.in_stock} />
    </div>
  );
};

export default ProductInfo;
