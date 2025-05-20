// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import { authReducer, matchesReducer } from './Slice';

// Import your reducers
// Import other reducers as needed

// Configure persistence for auth
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  // You can blacklist specific fields you don't want to persist
  // blacklist: ['loading', 'error']
};

// Configure persistence for matches
const matchesPersistConfig = {
  key: 'matches',
  storage: AsyncStorage,
  // Don't persist lastUpdated as we want fresh data on app restart
  blacklist: ['lastUpdated']
};

// Create the persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedMatchesReducer = persistReducer(matchesPersistConfig, matchesReducer);

// Configure the store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    matches: persistedMatchesReducer,
    // Add other reducers here
  },
  middleware: [thunk],
  // Disable serializableCheck middleware or configure it to ignore persist actions
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

export const persistor = persistStore(store);