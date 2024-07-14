// src/features/article/articleSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  articles: [],
  status: 'idle',
  error: null,
};

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
  const response = await axios.get('http://localhost:3001/articles?page=${page}');
  return response.data;
});

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    addArticle: (state, action) => {
      state.articles.push(action.payload);
    },
    // autres reducers pour update, delete
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addArticle } = articleSlice.actions;
export default articleSlice.reducer;
