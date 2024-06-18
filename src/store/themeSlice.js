import { createSlice } from '@reduxjs/toolkit';

import { themeConfig } from '@/utils/config';

const initialDarkMode = () => {
  const item = window.localStorage.getItem('darkMode');
  return item ? JSON.parse(item) : themeConfig.theme.darkMode;
};

const initialSidebarCollapsed = () => {
  const item = window.localStorage.getItem('sidebarCollapsed');
  return item ? JSON.parse(item) : themeConfig.theme.menu.isCollapsed;
};

const initialState = {
  darkMode: initialDarkMode(),
  isCollapsed: initialSidebarCollapsed(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    handleDarkMode: (state, action) => {
      state.darkMode = action.payload;
      window.localStorage.setItem('darkMode', action.payload);
    },
    handleSidebarCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
      window.localStorage.setItem('sidebarCollapsed', action.payload);
    },
  },
});

export const { handleDarkMode, handleSidebarCollapsed } = themeSlice.actions;

export default themeSlice.reducer;
