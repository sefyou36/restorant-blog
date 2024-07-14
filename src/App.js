// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/Home';
import AddArticle from './pages/AddArticle';
import ArticleDetail from './pages/ArticleDetail';
import About from './pages/About';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-article" element={<PrivateRoute><AddArticle /></PrivateRoute>} />
            <Route path="/articles" element={<ArticleDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
