import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import authReducer from './authSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'theme'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
  devTools: import.meta.env.MODE !== 'production',
});

export const persistor = persistStore(store);
export default store;
