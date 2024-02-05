// cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Product } from './productsSlice';
import { RootState } from '../store';

interface CartItem {
  id: number;
  quantity: number;
  productId: any;
  product: Product;
}

interface CheckoutData {
  total_amount: number;
  total_discount: number;
  created_at: string;
  reference_number: string;
}

interface CartState {
  cartItems: CartItem[];
  isLoading: boolean;
  error: string | null;
  checkoutData: CheckoutDataType | null;
  fetchedCheckoutData: CheckoutData | null; // New field
}

interface CheckoutDataType {
  id: string;
  date: string;
  amountSpent: number;
  paymentMethod: string;
  referenceNumber: string;
}

const initialState: CartState = {
  cartItems: [],
  isLoading: false,
  error: null,
  checkoutData: null,
  fetchedCheckoutData: null,
};

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/cart/`, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue('Error fetching cart items.');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ id, quantity }: { id: number, quantity: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/add-to-cart/${id}/`, { quantity }, {
        withCredentials: true,
      });
      toast.success('Product added to cart!');
      return { ...response.data, id, quantity };
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

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/remove-from-cart/${id}/`, {
        withCredentials: true,
      });
      toast.success('Product removed from cart!');
      return id;
    } catch (err) {
      console.log(err)
    }
  }
);

export const initiateCheckout = createAsyncThunk(
  'cart/initiateCheckout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/create-checkout-session/`,
        {},  // Empty body or relevant data
        { withCredentials: true }
      );
      const session = response.data;
      return {
        id: session.id, // Make sure these fields are actually returned from the backend
        amountSpent: session.amountSpent, // Ensure this field is provided by the backend
        paymentMethod: session.paymentMethod,
        referenceNumber: session.referenceNumber
      };
    } catch (error) {
      return rejectWithValue('Error initiating checkout: ');
    }
  }
);

export const fetchCheckoutData = createAsyncThunk(
  'cart/fetchCheckoutData',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/get-checkout-data/`, {
        withCredentials: true,
      });
      return response.data as CheckoutData;
    } catch (err) {
      return rejectWithValue('Error fetching checkout data.');
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ id, quantity }: { id: number; quantity: number }, { rejectWithValue }) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/ecommerce/update-cart-item/${id}/`, { quantity }, {
        withCredentials: true,
      });
      toast.success('The item quantity has been successfully updated.');
      return { id, quantity };
    } catch (err) {
      toast.error('Error updating cart item.');
      return rejectWithValue('Error updating cart item.');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== idToRemove);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.isLoading = false;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear error on new request
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.isLoading = false;
        const newItem = action.payload;
        const existingItem = state.cartItems.find(item => item.id === newItem.id);
        if (existingItem) {
          existingItem.quantity = newItem.quantity; // Update quantity if the item exists
        } else {
          state.cartItems.push(newItem); // Push the new item if it doesn't exist
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action: PayloadAction<{ id: number; quantity: number }>) => {
        const { id, quantity } = action.payload;
        const item = state.cartItems.find(item => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(removeFromCart.fulfilled, (state, action) => {
        const idToRemove = action.payload;
        state.cartItems = state.cartItems.filter(item => item.id !== idToRemove);
      })

      .addCase(fetchCheckoutData.fulfilled, (state, action) => {
        state.fetchedCheckoutData = action.payload;
      })
      .addCase(fetchCheckoutData.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
