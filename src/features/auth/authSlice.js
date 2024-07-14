// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const performLogin = createAsyncThunk(
  'auth/performLogin',
  async ({ username, password }, { rejectWithValue }) => {
    // Remplacer par votre logique d'authentification réelle
    if (username === 'admin' && password === '123456') {
      return { username };
    } else {
      return rejectWithValue('Invalid credentials');
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performLogin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(performLogin.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
