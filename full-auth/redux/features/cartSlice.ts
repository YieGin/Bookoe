// cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }: { productId: number, quantity: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/add-to-cart/${productId}/`, { quantity }, {
        withCredentials: true,
      });
      toast.success('Product added to cart!');
      return { ...response.data, productId, quantity };
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
        toast.error('You must be logged in to add items to the cart.');
      } else {
        toast.error('Error adding product to cart.');
      }
      return rejectWithValue('Error adding product to cart.');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Reducers for additional cart actions can be defined here
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear error on new request
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<{ productId: number, quantity: number }>) => {
        state.isLoading = false;
        const { productId, quantity } = action.payload;
        const existingItem = state.cartItems.find(item => item.productId === productId);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.cartItems.push({ productId, quantity });
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { } = cartSlice.actions; // Export any reducers you've defined
export default cartSlice.reducer;
