import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  selectedFilter: string;
  displayFilter: string;
  selectedCategories: string[];
  minPrice: number;
  maxPrice: number;
  yearFilter: string;
  selectedPublishers: string[];
}

const initialState: FilterState = {
  selectedFilter: 'Featured',
  displayFilter: 'Featured',
  selectedCategories: [],
  minPrice: 0,
  maxPrice: 1000,
  yearFilter: '',
  selectedPublishers: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedFilter: (state, action: PayloadAction<string>) => {
      state.selectedFilter = action.payload;
    },
    setDisplayFilter: (state, action: PayloadAction<string>) => {
      state.displayFilter = action.payload;
    },
    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    setYearFilter: (state, action: PayloadAction<string>) => {
      state.yearFilter = action.payload;
    },
    setSelectedPublishers: (state, action: PayloadAction<string[]>) => {
      state.selectedPublishers = action.payload;
    },
    resetFilters: (state) => {
      state.selectedFilter = 'Featured';
      state.displayFilter = 'Featured';
      state.selectedCategories = []; // Reset to empty array
      state.selectedPublishers = [];
      state.minPrice = 0;
      state.maxPrice = 1000;
      state.yearFilter = '';
    },
  },
});

export const {
  setSelectedFilter, setDisplayFilter, setSelectedCategories,
  setMinPrice, setMaxPrice, setYearFilter, resetFilters, setSelectedPublishers
} = filterSlice.actions;

export const selectSelectedFilter = (state: any) => state.filter.selectedFilter;
export const selectDisplayFilter = (state: any) => state.filter.displayFilter;
export const selectSelectedCategories = (state: any) => state.filter.selectedCategories;
export const selectMinPrice = (state: any) => state.filter.minPrice;
export const selectMaxPrice = (state: any) => state.filter.maxPrice;
export const selectYearFilter = (state: any) => state.filter.yearFilter;
export const selectSelectedPublishers = (state: any) => state.filter.selectedPublishers;

export default filterSlice.reducer;