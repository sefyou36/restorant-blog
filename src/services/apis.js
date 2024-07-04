import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Utilisation du port 3001 pour json-server

export const getArticles = async () => {
  return await axios.get(`${API_URL}/articles`);
};

export const addArticle = async (article) => {
  return await axios.post(`${API_URL}/articles`, article);
};

export const getArticleById = async (id) => {
  return await axios.get(`${API_URL}/articles/${id}`);
};

export const updateArticle = async (id, article) => {
  return await axios.put(`${API_URL}/articles/${id}`, article);
};

export const deleteArticle = async (id) => {
  return  axios.delete(`${API_URL}/articles/${id}`);
};

export const saveArticle = (article) => {
  return axios.post(`${API_URL}/articles`, article);
};