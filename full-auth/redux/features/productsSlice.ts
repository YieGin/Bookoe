import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PRODUCTS_PER_PAGE = 16;
export interface Product {
  id: number;
  title: string;
  image: string;
  author: string;
  discount: string;
  description: string;
  published_year: string;
  categories: { name: string }[];
  stars: string;
  price: string;
  publisher: string;
  discount_percentage: number;
  topic: string;
  is_best_seller: boolean;
  is_special: boolean;
  sales_count: number;
  additional_images: { image: string }[];
  // Add other properties of Product as needed
}

interface ProductsState {
  allOfProducts: Product[];
  allProducts: Product[];
  bestSellerProducts: Product[];
  fetchSpecialOffers: Product[];
  recommendedProducts: Product[];
  News: Product[];
  newestBooks: Product[];
  fiveStarProducts: Product[];
  historyCategoryProducts: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: ProductsState = {
  allOfProducts: [],
  allProducts: [],
  bestSellerProducts: [],
  fetchSpecialOffers: [],
  recommendedProducts: [],
  News: [],
  newestBooks: [],
  fiveStarProducts: [],
  historyCategoryProducts: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  currentProduct: null,
};

// Thunk for fetching all products
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/all-products/`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching all products');
    }
  }
);


// Thunk for fetching pagination products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page: number, { rejectWithValue }) => {
    try {
      // Adjust the URL according to your API
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/products/?page=${page}`);
      
      // Adjust this according to your API's response structure
      if (response.data && response.data.results) {
        const totalPages = Math.ceil(response.data.count / PRODUCTS_PER_PAGE);
        return { products: response.data.results, totalPages };
      } else {
        return rejectWithValue('Unexpected response format');
      }
    } catch (error) {
      return rejectWithValue('Error fetching products');
    }
  }
);


// Thunk for fetching a single product by its ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/products/${productId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching product by ID');
    }
  }
);


// Thunk for fetching best-seller products
export const fetchBestSellers = createAsyncThunk(
  'products/fetchTopBestSellers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/best-sellers/`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching top best sellers');
    }
  }
);


// Thunk for fetching Special Offers products
export const fetchSpecialOffers = createAsyncThunk(
  'products/fetchSpecialOffers',
  async (_, { rejectWithValue }) => {
      try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/special-offers/`);
          return response.data;
      } catch (error) {
          return rejectWithValue('Error fetching top Special Offer');
      }
  }
);

// Thunk for fetching recommended products
export const fetchRecommendedProducts = createAsyncThunk(
  'products/fetchRecommendedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/recommended-products/`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching recommended products');
    }
  }
);


// Thunk for fetching News
export const fetchNews = createAsyncThunk(
  'products/fetchNews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/news/`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching news');
    }
  }
);

// Thunk for fetching newest books
export const fetchNewestBooks = createAsyncThunk(
  'products/fetchNewestBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/newest-books/`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching newest books');
    }
  }
);


// Thunk for fetching 5-star products
export const fetchFiveStarProducts = createAsyncThunk(
  'products/fetchFiveStarProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/five-star-products/`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching 5-star products');
    }
  }
);



// Creating the slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* fetch All Products */
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allOfProducts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      /* fetchProductById */
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        // Handle rejection case
        state.error = action.payload as string;
      })

      /* fetchProducts */
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      /* fetchBestSellers */
      .addCase(fetchBestSellers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBestSellers.fulfilled, (state, action) => {
        state.bestSellerProducts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBestSellers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      /* fetchSpecialOffers */
      .addCase(fetchSpecialOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSpecialOffers.fulfilled, (state, action) => {
        state.fetchSpecialOffers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSpecialOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      /* fetchNews */
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.News = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      /* fetchRecommendedProducts */
      .addCase(fetchRecommendedProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecommendedProducts.fulfilled, (state, action) => {
        state.recommendedProducts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRecommendedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // In the fetchNewestBooks
      .addCase(fetchNewestBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNewestBooks.fulfilled, (state, action) => {
        state.newestBooks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchNewestBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // In the fetchFiveStarProducts
      .addCase(fetchFiveStarProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFiveStarProducts.fulfilled, (state, action) => {
        state.fiveStarProducts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFiveStarProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  },
});

export default productsSlice.reducer;