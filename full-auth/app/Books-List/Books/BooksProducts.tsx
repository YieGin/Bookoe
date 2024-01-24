// BooksProducts.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProducts } from '@/redux/features/productsSlice';
import { fetchFavorites, addFavorite } from '@/redux/features/favoritesSlice';
import { LiaStarSolid } from "react-icons/lia";
import { 
  selectSelectedCategories, 
  selectSelectedFilter, 
  selectMinPrice, 
  selectMaxPrice, 
  selectYearFilter, 
  selectSelectedPublishers 
} from '@/redux/features/filterSlice';
import ProductCard from './ProductCard';
import { fetchFavoritesCount } from '@/redux/features/favoritesCountSlice';

interface BooksProductsProps {
  currentPage: number;
}

const BooksProducts: React.FC<BooksProductsProps> = ({ currentPage }) => {
  const dispatch = useAppDispatch();
  const selectedFilter = useAppSelector(selectSelectedFilter);
  const selectedCategories = useAppSelector(selectSelectedCategories);
  const minPrice = useAppSelector(selectMinPrice);
  const maxPrice = useAppSelector(selectMaxPrice);
  const yearFilter = useAppSelector(selectYearFilter);
  const selectedPublishers = useAppSelector(selectSelectedPublishers);
  const auth = useAppSelector((state) => state.auth);
  const products = useAppSelector((state) => state.products.allProducts);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const [isAdding, setIsAdding] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set<number>());

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
    if (auth.isAuthenticated) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, currentPage, auth.isAuthenticated]);

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
      dispatch(fetchFavoritesCount());
    } catch (error) {
      console.error('Error adding to favorites:', error);
    } finally {
      setIsAdding(false);
    }
  };

  let filteredProducts = products.filter(product => {
    const price = parseFloat(product.price);
    const inPriceRange = price >= minPrice && price <= maxPrice;
    const inSelectedCategories = selectedCategories.length === 0 || 
      product.categories.some(category => selectedCategories.includes(category));
    const inSelectedPublishers = selectedPublishers.length === 0 || 
      selectedPublishers.includes(product.publisher);
    const inSelectedYear = !yearFilter || product.published_year.startsWith(yearFilter);

    return inPriceRange && inSelectedCategories && inSelectedPublishers && inSelectedYear;
  });

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
      {filteredProducts.map((product) => (
        <ProductCard 
          key={product.id}
          product={product}
          isFavorite={favoriteIds.has(product.id)}
          onAddFavorite={handleAddFavorite}
        />
      ))}
    </div>
  );
};

export default BooksProducts;