// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import { authReducer } from './Slice';

// Import your reducers
// Import other reducers as needed

// Configure persistence for auth
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  // You can blacklist specific fields you don't want to persist
  // blacklist: ['loading', 'error']
};

// Create the persisted reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Configure the store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
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