import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddArticle from './pages/AddArticle';
import ArticleDetail from './pages/ArticleDetail';
import About from './pages/About';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <ul className="nav nav-pills">
            <li>
              <Link className="btn btn-outline-info ms-1" to="/">Home</Link>
            </li>
            <li>
              <Link className="btn btn-outline-info ms-1" to="/articles">Articles</Link>
            </li>
            <li>
              <Link className="btn btn-outline-info ms-1" to="/add-article">New Articles</Link>
            </li>
            <li>
              <Link className="btn btn-outline-info ms-1" to="/about">About</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-article" element={<AddArticle />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
