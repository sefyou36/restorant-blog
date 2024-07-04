// // Navigation.js
// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const Navigation = () => {
//   const location = useLocation();

//   return (
//     <nav>
//       <ul>
//         <li className={location.pathname === '/' ? 'active' : ''}>
//           <Link to="/">Accueil</Link>
//         </li>
//         <li className={location.pathname === '/articles' ? 'active' : ''}>
//           <Link to="/articles">Articles</Link>
//         </li>
//         <li className={location.pathname === '/add-article' ? 'active' : ''}>
//           <Link to="/add-article">Ajouter un article</Link>
//         </li>
//         <li className={location.pathname === '/about' ? 'active' : ''}>
//           <Link to="/about">À Propos</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navigation;
