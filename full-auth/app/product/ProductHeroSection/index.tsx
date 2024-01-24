'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { usePathname, useSearchParams } from 'next/navigation';
import { Product, fetchAllProducts } from '@/redux/features/productsSlice';
import Social from './Social';
import { addToCart, removeFromCart } from '@/redux/features/cartSlice';
import { addFavorite, fetchFavorites } from '@/redux/features/favoritesSlice';
import { fetchCartCount } from '@/redux/features/cartCountSlice';
import { fetchFavoritesCount } from '@/redux/features/favoritesCountSlice';
import ProductInteraction from './ProductInteraction';
import ProductInfo from './ProductInfo';
import ProductAuthorDetails from './ProductAuthorDetails';
import ProductStats from './ProductStats';

interface ProductDetailsSectionProps {
    product: Product;
  }

const ProductHeroSection: React.FC<ProductDetailsSectionProps> = ({ product }) => {
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
      dispatch(fetchFavorites());
    }
  }, [dispatch, auth.isAuthenticated]);

  useEffect(() => {
    const newFavoriteIds = new Set(favorites.map(favorite => favorite.productId));
    setFavoriteIds(newFavoriteIds);
  }, [favorites]);

  // cart sectioon
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
    dispatch(addToCart({ productId: product.id, quantity }))
      .then(() => dispatch(fetchCartCount()));
  };
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
    sessionStorage.setItem(`product_${productId}_quantity`, '1');
    setQuantity(1);
  };

  // favorite sectioon
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
      <h1 className='text-black font-bold text-[40px]'>{product.title}</h1>
      <div className='flex justify-between items-center'>
        <ProductStats product={product} />
        <Social />
      </div>
      <p className='mr-5 text-[#757575] font-semibold text-[16px] font-sans mt-5'>{product.description}</p>
      <div className='flex gap-x-14 mt-10 items-center justify-between'>
        <ProductAuthorDetails product={product} />
        <ProductInfo product={product} />
      </div>
      <hr className="border-0 h-0 bg-transparent my-10" style={{ borderStyle: 'dotted', borderWidth: '2px', borderColor: '#ccc', borderSpacing: '44px' }} />
      <ProductInteraction product={product} quantity={quantity} handleIncrement={handleIncrement} handleDecrement={handleDecrement} handleAddToCart={handleAddToCart} handleAddFavorite={handleAddFavorite} favoriteIds={favoriteIds} />
    </div>
  );
};

export default ProductHeroSection;
