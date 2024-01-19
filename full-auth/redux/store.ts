import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import favoritesReducer from "./features/favoritesSlice"; 
import productsReducer from "./features/productsSlice";
import favoritesCountReducer from './features/favoritesCountSlice';
import themeMenuReducer from './features/themeMenuSlice';
import cartReducer from "./features/cartSlice";
import cartCountReducer from './features/cartCountSlice';
import filterReducer from './features/filterSlice';
import { apiSlice } from "./services/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoritesReducer,
        products: productsReducer,
        favoritesCount: favoritesCountReducer,
        themeMenu: themeMenuReducer,
        cart: cartReducer,
        filter: filterReducer,
        cartCount: cartCountReducer, 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
