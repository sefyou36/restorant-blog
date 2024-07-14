// src/pages/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { performLogin } from '../features/auth/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(performLogin({ username, password })).unwrap();
      navigate('/');
    } catch (err) {
      // Erreur déjà gérée dans le slice
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-200">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {error && <div className="mt-4 text-red-600">{error}</div>}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
