import { Product } from '@/redux/features/productsSlice';
import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { LuHeart } from 'react-icons/lu';

interface ProductInteractionProps {
  product: Product;
  quantity: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleAddToCart: () => void;
  handleAddFavorite: (productId: number) => void;
  favoriteIds: Set<number>;
}


const ProductInteraction: React.FC<ProductInteractionProps> = ({
  product,
  quantity,
  handleIncrement,
  handleDecrement,
  handleAddToCart,
  handleAddFavorite,
  favoriteIds
}) => {
  return (
    <div className='flex justify-between items-center'>
        <div className='flex items-center gap-x-7'>
          <p className='text-[#11142D] text-[40px] font-bold font-Cairo'>${product.discount}</p>
          <p className='text-[#636363] text-[20px] font-semibold line-through'>{product.price}</p>
          {product.discount_percentage && product.discount_percentage > 0 && (
            <div className="text-[15px] font-bold text-white rounded-[14px] bg-[#FF754C] px-4">
              {product.discount_percentage.toFixed(0)}%
            </div>
          )}
        </div>
        <div className='flex gap-x-5'>
            <div className='rounded-[14px] px-5 flex border-[1px] items-center gap-x-5 py-2'>
            <button onClick={handleDecrement}>
              <FaMinus className="text-[17px] text-[#6C5DD3]" />
            </button>
            <p>{quantity}</p>
            <button onClick={handleIncrement}>
              <FaPlus className="text-[12px] text-[#6C5DD3]" />
            </button>
            </div>
            <button onClick={handleAddToCart} className='bg-[#6C5DD3] rounded-[14px] px-5 py-3 text-white flex items-center gap-x-5'>
              <IoCartOutline className="text-[17px] text-[#fff]" />
              <p>Add to cart</p>
            </button>
            <div className='border-[1px] rounded-[14px] px-4 flex items-center justify-center'>
              <div 
                onClick={() => handleAddFavorite(product.id)} 
                className={`cursor-pointer ${favoriteIds.has(product.id) ? 'text-red-500' : 'text-[#6C5DD3]'} flex items-center justify-center`}
              >
                <LuHeart className='text-[20px]' />
              </div>
            </div>
      </div>
    </div>
  );
};

export default ProductInteraction;
