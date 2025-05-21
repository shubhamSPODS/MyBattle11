import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  user: null,
  token: null,
};

const initialMatchesState = {
  upcomingMatches: [],
  myMatches: [],
  lastUpdated: null,
  contestData:[]
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

const matchesSlice = createSlice({
  name: 'matches',
  initialState: initialMatchesState,
  reducers: {
    setMatchesData: (state, action) => {
      state.upcomingMatches = action.payload.upcoming || [];
      state.myMatches = action.payload.mymatches || [];
      state.lastUpdated = new Date().toISOString();
    },
    clearMatchesData: (state) => {
      state.upcomingMatches = [];
      state.myMatches = [];
      state.lastUpdated = null;
    },
    setContestData: (state, action) => {
      state.contestData = action.payload || [];
    },
  },
});

export const {
  logout,
  updateUserProfile,
  setUserToken,
} = authSlice.actions;

export const {
  setMatchesData,
  clearMatchesData,
} = matchesSlice.actions;

export const authReducer = authSlice.reducer;
export const matchesReducer = matchesSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectUpcomingMatches = (state) => state.matches.upcomingMatches;
export const selectMyMatches = (state) => state.matches.myMatches;
export const selectMatchesLastUpdated = (state) => state.matches.lastUpdated;
