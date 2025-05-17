import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setUserToken: (state, action) => {
      state.token = action.payload; 
    },
  },
});

// Export actions
export const {
  logout,
  updateUserProfile,
  setUserToken,
} = authSlice.actions;

// Export reducer
export const authReducer = authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
