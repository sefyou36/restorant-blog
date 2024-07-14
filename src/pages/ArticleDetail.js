import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getArticles, deleteArticle, updateArticle } from '../services/apis';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

export default function Articles() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [, setError] = useState(null);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    handleGetArticles();
  }, []);

  const handleGetArticles = () => {
    getArticles()
      .then((resp) => {
        setArticles(resp.data);
        setFilteredArticles(resp.data);
        setError(null);
      })
      .catch(err => {
        setError(err);
        console.error("Error fetching articles:", err);
      });
  };

  const handleDeleteArticle = (id) => {
    deleteArticle(id)
      .then(() => {
        handleGetArticles();
      })
      .catch(err => {
        setError(err);
        console.error("Error deleting article:", err);
      });
  };

  const handleEditArticle = (index) => {
    setEditingArticle({ ...articles[index] });
    setEditingIndex(index);
  };

  const handleUpdateArticle = (e) => {
    e.preventDefault();
    updateArticle(editingArticle.id, editingArticle)
      .then(() => {
        const updatedArticles = [...articles];
        updatedArticles[editingIndex] = editingArticle;
        setArticles(updatedArticles);
        setFilteredArticles(updatedArticles);
        setEditingArticle(null);
        setEditingIndex(-1);
      })
      .catch(err => {
        setError(err);
        console.error("Error updating article:", err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingArticle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filtered = articles.filter(article =>
      (article.titre && article.titre.toLowerCase().includes(query.toLowerCase())) ||
      (article.description && article.description.toLowerCase().includes(query.toLowerCase())) ||
      (article.categorie && article.categorie.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredArticles(filtered);
  };

  return (
    <div className="flex items-center justify-center margin-top-10 min-h-screen bg-gray-100 dark:bg-gray-800 pt-10">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg p-6">
        <div className="p-6">
          <div className="mb-4">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <input
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
                type="text"
                value={query}
                placeholder="Search..."
              />
              <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 focus:outline-none focus:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-700">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>
          {editingArticle && (
            <div className="mb-4">
              <form onSubmit={handleUpdateArticle}>
                <div className="mt-4">
                  <label className="block text-gray-700 dark:text-gray-200">Titre</label>
                  <input
                    type="text"
                    name="titre"
                    value={editingArticle.titre}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 dark:text-gray-200">Description</label>
                  <textarea
                    name="description"
                    value={editingArticle.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 dark:text-gray-200">Categorie</label>
                  <input
                    type="text"
                    name="categorie"
                    value={editingArticle.categorie}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                  >
                    Update Article
                  </button>
                </div>
              </form>
            </div>
          )}
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200">Titre</th>
                <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200">Description</th>
                <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200">Categorie</th>
                {isAuthenticated && (
                  <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200">Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article, index) => (
                <tr key={article.id}>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">{article.titre}</td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">{article.description}</td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">{article.categorie}</td>
                  {isAuthenticated && (
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        onClick={() => handleEditArticle(index)}
                        className="bg-green-600 text-white px-3 py-1 ml-2 rounded-lg hover:bg-green-700 focus:outline-none focus:bg-green-700"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
