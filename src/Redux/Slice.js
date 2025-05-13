// Slice.js
import { createSlice } from '@reduxjs/toolkit';

// Auth Slice - Simplified
const initialAuthState = {
  isLoggedIn: false,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    }
  }
});

// Export actions
export const { 
  login,
  logout,
  updateUserProfile 
} = authSlice.actions;

// Export reducer
export const authReducer = authSlice.reducer;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectCurrentUser = (state) => state.auth.user;