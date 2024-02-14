// features/themeMenuSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeMenuState {
  theme: string;
  openMenu: boolean;
}

const initialState: ThemeMenuState = {
  theme: 'light', // default value
  openMenu: false,
};

export const themeMenuSlice = createSlice({
  name: 'themeMenu',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
      if (action.payload === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});

export const { setTheme } = themeMenuSlice.actions;

export default themeMenuSlice.reducer;
