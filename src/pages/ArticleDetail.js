import React, { useState, useEffect } from 'react';
import { getArticles, deleteArticle } from '../services/apis';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
export default function Articles() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleGetArticles();
  }, []);

  const handleGetArticles = () => {
    getArticles()
      .then((resp) => {
        setArticles(resp.data);
        setFilteredArticles(resp.data);
        setError(null); // Réinitialiser les erreurs à null si la requête réussit
      })
      .catch(err => {
        setError(err); // Capturer l'erreur si la requête échoue
        console.error("Error fetching articles:", err);
      });
  };

  const handleDeleteArticle = (id) => {
    deleteArticle(id)
      .then(() => {
        handleGetArticles(); // Recharger les articles après suppression
      })
      .catch(err => {
        setError(err); // Capturer l'erreur si la suppression échoue
        console.error("Error deleting article:", err);
      });
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
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200">Titre</th>
                <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200">Description</th>
                <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200">Categorie</th>
                <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr key={article.id}>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">{article.titre}</td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">{article.description}</td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">{article.categorie}</td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}