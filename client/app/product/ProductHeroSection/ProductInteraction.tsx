import { Product } from '@/redux/features/productsSlice';
import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { LuHeart } from 'react-icons/lu';
import { toast } from 'react-toastify';

interface ProductInteractionProps {
  product: Product;
  quantity: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleAddToCart: () => void;
  handleAddFavorite: (productId: number) => void;
}


const ProductInteraction: React.FC<ProductInteractionProps> = ({
  product,
  quantity,
  handleIncrement,
  handleDecrement,
  handleAddToCart,
  handleAddFavorite,
}) => {
  const [isAddingFavorite, setIsAddingFavorite] = useState(false);
  const handleAddFavoriteWithDelay = (productId: number) => {
    if (isAddingFavorite) {
      toast.error("Please wait before trying again.");
      return;
    }

    handleAddFavorite(productId);
    setIsAddingFavorite(true);
    setTimeout(() => setIsAddingFavorite(false), 1000); 
  };

  return (
    <div className='flex justify-between flex-wrap items-center gap-y-3'>
      <div className='flex items-center md:gap-x-7 xs:gap-x-2 xs:w-full md:w-max'>
        <p className='text-[#11142D] md:text-[40px] xs:text-[30px] dark:text-[#fff] font-bold font-Cairo'>${product.discount}</p>
        <p className='text-[#636363] md:text-[20px] xs:text-[18px] dark:text-[#D7D7D7] font-semibold line-through mr-auto'>{product.price}</p>
        {product.discount_percentage && product.discount_percentage > 0 && (
          <div className="text-[15px] font-bold text-white dark:text-[#F0F0F0] rounded-[14px] bg-[#FF754C] px-4">
            {product.discount_percentage.toFixed(0)}%
          </div>
        )}
      </div>
      <div className='flex md:gap-x-5 xs:justify-between md:justify-normal xs:w-full md:w-max xs:gap-x-2'>
        <div className='rounded-[14px] md:px-5 xs:px-2 border-[#5f5f5f] flex border-[1px] items-center md:gap-x-5 xs:gap-x-4 py-2'>
          <button onClick={handleDecrement}>
            <FaMinus className="md:text-[17px] xs:text-[14px] text-[#6C5DD3]" />
          </button>
          <p className='dark:text-[#fff]'>{quantity}</p>
          <button onClick={handleIncrement}>
            <FaPlus className="md:text-[12px] xs:text-[10px] text-[#6C5DD3]" />
          </button>
        </div>
        <div onClick={() => handleAddFavoriteWithDelay(product.id)}  className={`border-[1px] rounded-[14px] border-none px-4 flex items-center justify-center bg-[#6C5DD3]`}>
          <div 
            className={`cursor-pointer text-white flex items-center justify-center`}>
            <LuHeart className='text-[20px]' />
          </div>
        </div>
        <button onClick={handleAddToCart} className='button px-3'>
          <IoCartOutline className="text-[17px] text-[#fff]" />
          <p className='text-white font-bold xs:text-[10px] sm:text-[14px] lg-md:text-[14px] '>Add to cart</p>
        </button>
      </div>
    </div>
  );
};

export default ProductInteraction;
