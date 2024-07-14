// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './features/article/articleSlice';
import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    articles: articleReducer,
    auth: authReducer,
  },
});

export default store;
