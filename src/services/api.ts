import axios from 'axios';
const url = process.env.REACT_APP_API_URL;
console.log("URL:", url)
const api = axios.create({
  baseURL: 'https://apitesteaddimition.online/',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
