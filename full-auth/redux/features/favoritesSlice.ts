import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RootState } from '../store';

interface Favorite {
  productId: number;
}

interface FavoritesState {
  favorites: Favorite[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  isLoading: false,
  error: null,
};

export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/add-to-favorites/${productId}/`, {}, {
        withCredentials: true,
      });
      toast.success('Product added to favorites!');
      return response.data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
          toast.error('You must be logged in to add favorites.');
        } else {
          toast.error('Error adding product to favorites.');
        }
        return rejectWithValue('Error adding product to favorites.');
      }
  }
);

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    if (!state.auth.isAuthenticated) {
      // If the user is not authenticated, we can't fetch favorites.
      return rejectWithValue('User not authenticated');
    }
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/favorites/`, {
        withCredentials: true,
      });
      // The backend is expected to return an array of product IDs directly.
      return response.data; // This should be an array of IDs.
    } catch (error) {
      return rejectWithValue('Error fetching favorites');
    }
  }
);
  
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear error on new request
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        const newFavorite = action.payload; // Ensure this payload has the productId
        if (!state.favorites.some(favorite => favorite.productId === newFavorite.productId)) {
          state.favorites.push(newFavorite);
        }
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'An error occurred';
      })
      // Handle the fetchFavorites action
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<number[]>) => {
        state.isLoading = false;
        // Make sure we are creating an array of objects with productId property
        state.favorites = action.payload.map(productId => ({ productId }));
      })
      
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
  
  export default favoritesSlice.reducer;