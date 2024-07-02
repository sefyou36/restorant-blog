import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/add-article">Ajouter un article</Link></li>
        <li><Link to="/about">À Propos</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
