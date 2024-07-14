// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../features/article/articleSlice';
import Articles from '../pages/ArticleDetail';

const Home = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const totalPages = useSelector((state) => state.articles.totalPages);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchArticles({ page }));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto mt-20">
      <h1 className="flex justify-center text-3xl font-bold mb-4">Welcome to Blog Restaurant</h1>
      <Articles articles={articles} />
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 mx-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 mx-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
