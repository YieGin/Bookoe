'use client'
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { fetchProducts } from '@/redux/features/productsSlice';
import { addFavorite } from '@/redux/features/favoritesSlice';
import { ToastContainer } from 'react-toastify';
import { Spinner } from '@/components/common';
import { fetchFavoritesCount } from '@/redux/features/favoritesCountSlice';
import { addToCart } from '@/redux/features/cartSlice';
import { fetchCartCount } from '@/redux/features/cartCountSlice';

const Products = () => {
  const dispatch = useAppDispatch();
  const { allProducts, isLoading, error } = useAppSelector((state) => state.products);
  const [isAdding, setIsAdding] = useState(false); // Track if an add to favorites action is in progress

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddFavorite = async (productId: number) => {
    if (isAdding) return; // Prevent multiple clicks
    setIsAdding(true); // Disable the button

    try {
      await dispatch(addFavorite(productId)).unwrap();
      dispatch(fetchFavoritesCount());
    } catch (error) {
      console.error('Error adding to favorites:', error);
    } finally {
      setIsAdding(false); // Re-enable the button
    }
  };

  const handleAddToCart = async (productId: number) => {
    if (isAdding) return;
    setIsAdding(true);
  
    try {
      await dispatch(addToCart({ productId, quantity: 1 })).unwrap();
      dispatch(fetchCartCount());
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) return <div><Spinner /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <ToastContainer />
      {allProducts.map((item) => (
        <div key={item.id}>
          <p>{item.id}</p>
          <img className='w-[400px] h-[300px]' src={item.image} alt=""/>
          <p>{item.title}</p>
          <p>{item.author}</p>
          <p>{item.discount}</p>
          <p>{item.stars}</p>
          <button onClick={() => handleAddFavorite(item.id)}>Add to Favorites</button>
          <button onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
