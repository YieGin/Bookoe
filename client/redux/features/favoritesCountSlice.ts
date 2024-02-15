import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface FavoritesCountState {
  count: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: FavoritesCountState = {
  count: 0,
  isLoading: false,
  error: null,
};

export const fetchFavoritesCount = createAsyncThunk<number, void, { state: RootState }>(
  'favoritesCount/fetchCount',
  async (_, { rejectWithValue, getState }) => {
    const { auth } = getState();
    if (!auth.isAuthenticated) {
      // Optionally handle the case where the user is not authenticated
      return 0;
    }

    try {
      const response = await axios.get(`https://bookoegin-d820f894692b.herokuapp.com/api/ecommerce/favorites-count/`, {
        withCredentials: true,
      });
      return response.data.count;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        // Optionally handle unauthorized errors
        return 0;
      } else {
        return rejectWithValue('Error fetching favorites count');
      }
    }
  }
);

const favoritesCountSlice = createSlice({
    name: 'favoritesCount',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Handle pending and fulfilled cases as before
        .addCase(fetchFavoritesCount.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchFavoritesCount.fulfilled, (state, action: PayloadAction<number>) => {
          state.isLoading = false;
          state.count = action.payload;
        })
        // Update the rejected case
        .addCase(fetchFavoritesCount.rejected, (state, action) => {
          state.isLoading = false;
          // Check if the payload is a string or null (as per your rejectWithValue)
          if (typeof action.payload === 'string' || action.payload === null) {
            state.error = action.payload;
          } else {
            // Handle the case where the payload is not as expected (e.g., SerializedError)
            state.error = 'An error occurred';
          }
        });
    },
  });

export default favoritesCountSlice.reducer;
