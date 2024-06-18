import { createSlice } from '@reduxjs/toolkit';

import { removeAuthFromLocalStorage } from '@/utils/helpers';
import { authConfig as initialState } from '@/utils/config';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action) {
      const { isAuthenticated, user, userType, userToken } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.user = user;
      state.userType = userType;
      state.userToken = userToken;
    },
    reset(state) {
      state.isAuthenticated = initialState.isAuthenticated;
      state.user = initialState.user;
      state.userType = initialState.userType;
      state.userToken = initialState.userToken;
      removeAuthFromLocalStorage();
    },
  },
});

export const { setAuthData, reset } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectUserType = (state) => state.auth.userType;

export default authSlice.reducer;
