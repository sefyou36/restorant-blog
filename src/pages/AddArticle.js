import React, { useState } from "react";
import { saveArticle } from "../services/apis";

export default function NewArticle() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [error, setError] = useState(null);

  const handleSaveArticle = (event) => {
    event.preventDefault();
    const article = { titre, description, categorie };
    saveArticle(article)
      .then((resp) => {
        alert("Article ajouté avec succès !");
        setTitre("");
        setDescription("");
        setCategorie("");
        setError(null); // Réinitialiser les erreurs à null si la requête réussit
      })
      .catch(err => {
        setError(err); // Capturer l'erreur si la sauvegarde échoue
        console.error("Error saving article:", err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 pt-20">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg p-6">
        <div className="p-6">
          <form onSubmit={handleSaveArticle} method="post">
            <div className="mb-4">
              <label htmlFor="titre" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
                Titre
              </label>
              <input
                id="titre"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
                Description
              </label>
              <input
                id="description"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="categorie" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
                Categorie
              </label>
              <input
                id="categorie"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500">Error saving article. Please try again later.</p>}
            <button className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 focus:outline-none focus:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-700">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
