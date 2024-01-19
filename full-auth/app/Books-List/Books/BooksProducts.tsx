'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Product, fetchProducts } from '@/redux/features/productsSlice';
import { fetchFavorites, addFavorite } from '@/redux/features/favoritesSlice';
import { LiaStarSolid } from "react-icons/lia";
import { LuHeart } from "react-icons/lu";
import {
  selectSelectedCategories,
  selectSelectedFilter,
  selectMinPrice,
  selectMaxPrice,
  selectYearFilter,
  selectSelectedPublishers,
} from '@/redux/features/filterSlice';

interface BooksProductsProps {
  currentPage: number;
}

const BooksProducts: React.FC<BooksProductsProps> = ({ currentPage }) => {
  const dispatch = useAppDispatch();
  const selectedFilter = useAppSelector(selectSelectedFilter);
  const selectedCategories = useAppSelector(selectSelectedCategories);
  const selectedPublishers = useAppSelector(selectSelectedPublishers);
  const minPrice = useAppSelector(selectMinPrice);
  const maxPrice = useAppSelector(selectMaxPrice);
  const yearFilter = useAppSelector(selectYearFilter);
  const auth = useAppSelector((state) => state.auth);
  const products = useAppSelector((state) => state.products.allProducts);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const [isAdding, setIsAdding] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set<number>());

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, auth.isAuthenticated]);

  useEffect(() => {
    const newFavoriteIds = new Set(favorites.map(favorite => favorite.productId));
    setFavoriteIds(newFavoriteIds);
  }, [favorites]);

  const handleAddFavorite = async (productId: number) => {
    if (isAdding) return;
    setIsAdding(true);
    try {
      await dispatch(addFavorite(productId)).unwrap();
      setFavoriteIds(new Set([...favoriteIds, productId]));
    } catch (error) {
      console.error('Error adding to favorites:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const renderStars = (stars: number) => {
    const totalStars = 5;
    return (
      <>
        {Array.from({ length: stars }, (_, i) => (
          <LiaStarSolid key={`star-${i}`} className='text-[#FF754C] text-[24px]' />
        ))}
        {Array.from({ length: totalStars - stars }, (_, i) => (
          <LiaStarSolid key={`gray-star-${i}`} className='text-gray-400 text-[24px]' />
        ))}
      </>
    );
  };
  

  let filteredProducts = products.filter(product => {
    // Check for price range
    const price = parseFloat(product.price);
    const inPriceRange = price >= minPrice && price <= maxPrice;

    // Check for selected categories
    const inSelectedCategories = selectedCategories.length === 0 ||
      product.categories.some(category => selectedCategories.includes(category));

    // Check for selected publishers
    const inSelectedPublishers = selectedPublishers.length === 0 ||
      selectedPublishers.includes(product.publisher);

    // Check for selected year
    const inSelectedYear = !yearFilter || product.published_year.startsWith(yearFilter);

    return inPriceRange && inSelectedCategories && inSelectedPublishers && inSelectedYear;
  });

  // Filter by selected categories
  if (selectedCategories.size > 0) {
    filteredProducts = filteredProducts.filter(product =>
      product.categories.some(category => selectedCategories.has(category))
    );
  }

  // Filter by year
  if (yearFilter) {
    filteredProducts = filteredProducts.filter(product => 
      product.published_year.startsWith(yearFilter)
    );
  }

  // Apply additional filtering or sorting based on selectedFilter
  switch (selectedFilter) {
    case 'Price: Low to High':
      filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break;
    case 'Price: High to Low':
      filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break;
    case 'Alphabetical':
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'Newest Arrivals':
      filteredProducts.sort((a, b) => new Date(b.published_year).getTime() - new Date(a.published_year).getTime());
      break;
    // Add more cases as needed
  }

  return (
    <div className='flex flex-wrap md:items-center md:justify-center gap-5 mt-10'>
      
      {filteredProducts.map((item) => (
        <div key={item.id} className='rounded-[14px] border-[1px] dark:border-[#5c5c5c] p-5 relative lg-md:w-[250px] md:w-[200px]'>
          <div 
            onClick={() => handleAddFavorite(item.id)} 
            className={`absolute cursor-pointer right-5 top-5 p-2 z-10 rounded-md bg-[#6C5DD3] flex items-center justify-center ${favoriteIds.has(item.id) ? 'bg-red-700' : 'bg-[#6C5DD3]'}`}
          >
            <LuHeart className='text-[20px] text-white' />
          </div>
          <img className='lg-md:h-[320px] lg-md:w-[220px] object-cover cursor-pointer rounded-[14px] hover:scale-110 transition-all duration-300 ease-in-out' src={item.image} alt={item.title} />
          <div className='flex flex-col items-center mt-5 gap-y-1'>
            <h1 className='text-[#11142D] dark:text-[#fff] font-bold text-[16px] font-Cairo line-clamp-1'>{item.title}</h1>
            <div className='flex gap-x-2 flex-wrap w-full items-center justify-center'>
              {item.categories.map((category, index) => (
                <p key={index} className='text-[#6C5DD3] dark:text-[#8a7bf0] text-[14px] font-sans cursor-pointer'>
                  {typeof category === 'string' ? category : category.name}
                </p>
              ))}
            </div>
            <div className='flex gap-x-2 items-center'>
              <p className='text-[#11142D] font-bold text-[20px] dark:text-[#F0F0F0]'>${item.discount}</p>
              <p className='text-[#AAAAAA] font-bold text-[16px] line-through'>${item.price}</p>
            </div>
            <div className='flex gap-x-2 items-center'>
              {renderStars(parseInt(item.stars))}
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksProducts;