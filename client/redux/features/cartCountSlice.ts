// cartCountSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface CartCountState {
  count: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartCountState = {
  count: 0,
  isLoading: false,
  error: null,
};

export const fetchCartCount = createAsyncThunk<number, void, { state: RootState }>(
  'cartCount/fetchCount',
  async (_, { rejectWithValue, getState }) => {
    const { auth } = getState();
    if (!auth.isAuthenticated) {
      return 0;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/cart-count/`, {
        withCredentials: true,
      });
      return response.data.count;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        return 0;
      } else {
        return rejectWithValue('Error fetching cart count');
      }
    }
  }
);

const cartCountSlice = createSlice({
  name: 'cartCount',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartCount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartCount.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.count = action.payload;
      })
      .addCase(fetchCartCount.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string' || action.payload === null) {
          state.error = action.payload;
        } else {
          state.error = 'An error occurred';
        }
      });
  },
});

export default cartCountSlice.reducer;
