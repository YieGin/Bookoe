'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { usePathname, useSearchParams } from 'next/navigation';
import { Product, fetchAllProducts, fetchFavoriteProducts } from '@/redux/features/productsSlice';
import Social from './Social';
import { addToCart } from '@/redux/features/cartSlice';
import { addFavorite } from '@/redux/features/favoritesSlice';
import { fetchCartCount } from '@/redux/features/cartCountSlice';
import { fetchFavoritesCount } from '@/redux/features/favoritesCountSlice';
import ProductInteraction from './ProductInteraction';
import ProductInfo from './ProductInfo';
import ProductAuthorDetails from './ProductAuthorDetails';
import ProductStats from './ProductStats';
import { toast } from 'react-toastify';

interface ProductDetailsSectionProps {
  product: Product;
  averageRating: Product | any;
  reviews: Product | any;
  ratingCount: Product | any;
}

const ProductHeroSection: React.FC<ProductDetailsSectionProps> = ({ product, averageRating, reviews, ratingCount }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productId = pathname.split('/').pop() || searchParams.get('id');
  const initialQuantity = Number(sessionStorage.getItem(`product_${productId}_quantity`)) || 1;
  const [quantity, setQuantity] = useState(initialQuantity);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const [isAdding, setIsAdding] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set<number>());
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllProducts());
    if (auth.isAuthenticated) {
      dispatch(fetchFavoriteProducts());
    }
  }, [dispatch, auth.isAuthenticated]);

  useEffect(() => {
    const newFavoriteIds = new Set(favorites.map(favorite => favorite.productId));
    setFavoriteIds(newFavoriteIds);
  }, [favorites]);

  // cart section
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    sessionStorage.setItem(`product_${productId}_quantity`, newQuantity.toString());
  };
  const handleDecrement = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    sessionStorage.setItem(`product_${productId}_quantity`, newQuantity.toString());
  };
  const handleAddToCart = () => {
    if (!product.in_stock) {
      toast.error('This product is out of stock and cannot be added to the cart.');
      return;
    }
    dispatch(addToCart({ id: product.id, quantity }))
      .then(() => dispatch(fetchCartCount()));
  };
  

  // favorite section
  const handleAddFavorite = async (productId: number) => {
    if (isAdding) return;
    setIsAdding(true);
    try {
      await dispatch(addFavorite(productId)).unwrap();
      setFavoriteIds(new Set([...favoriteIds, productId]));
      dispatch(fetchFavoritesCount());
    } catch (error) {
      console.error('Error adding to favorites:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className='w-full'>
      <h1 className='text-black font-bold md:text-[40px] xs:text-[30px] dark:text-white xs:mt-3 lg:mt-0'>{product.title}</h1>
      <div className='flex justify-between lg:items-center lg:flex-row xs:flex-col gap-y-2'>
        <ProductStats averageRating={averageRating} reviews={reviews} ratingCount={ratingCount} product={product} />
        <Social />
      </div>
      <p className='md:mr-5 text-[#757575] dark:text-[#D7D7D7] font-semibold md:text-[16px] xs:text-[12px] font-sans mt-5'>{product.description}</p>
      <div className='flex lg:gap-x-14 mt-10 items-center justify-between md:flex-nowrap xs:flex-wrap'>
        <ProductAuthorDetails product={product} />
        <ProductInfo product={product} />
      </div>
      <hr className="border-0 h-0 bg-transparent md:my-10 xs:my-5" style={{ borderStyle: 'dotted', borderWidth: '2px', borderColor: '#ccc', borderSpacing: '44px' }} />
      <ProductInteraction product={product} quantity={quantity} handleIncrement={handleIncrement} handleDecrement={handleDecrement} handleAddToCart={handleAddToCart} handleAddFavorite={handleAddFavorite} />
    </div>
  );
};

export default ProductHeroSection;
