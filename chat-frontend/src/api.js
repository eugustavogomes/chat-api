import axios from 'axios';

const api = axios.create({
  baseURL: '/message', // Usa proxy do Vite
});

export default api;
