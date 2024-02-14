import { Product } from '@/redux/features/productsSlice';
import React from 'react';
import { LiaStarSolid } from 'react-icons/lia'; 
import { FilterState } from '@/redux/features/filterSlice';

export const renderStars = (stars: number): JSX.Element => {
    return (
      <>
        {Array.from({ length: stars }, (_, i) => (
          <LiaStarSolid key={`star-${i}`} className='text-[#FF754C] text-[24px]' />
        ))}
        {Array.from({ length: 5 - stars }, (_, i) => (
          <LiaStarSolid key={`gray-star-${i}`} className='text-gray-400 text-[24px]' />
        ))}
      </>
    );
};

export const filterProducts = (products: Product[], filters: FilterState): Product[] => {
    let filteredProducts = products.filter(product => {
      const price = parseFloat(product.price);
      const inPriceRange = price >= filters.minPrice && price <= filters.maxPrice;
      const inSelectedCategories = filters.selectedCategories.length === 0 || 
        product.categories.some(category => 
        filters.selectedCategories.includes(category.name)
      );
      const inSelectedPublishers = filters.selectedPublishers.length === 0 || 
        filters.selectedPublishers.includes(product.publisher);
      const inSelectedYear = !filters.yearFilter || product.published_year.startsWith(filters.yearFilter);
  
      return inPriceRange && inSelectedCategories && inSelectedPublishers && inSelectedYear;
    });
  
    switch (filters.selectedFilter) {
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
  
    return filteredProducts;
};
