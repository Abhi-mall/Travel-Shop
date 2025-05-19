import axios from 'axios'
import SummaryApi, { baseURL } from '../common/SummaryApi'


const Axios = axios.create({
  baseURL : baseURL,
  withCredentials: true
})

// Axios.get('/api/user/user-details', {
//   withCredentials: true
// });

Axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default Axios

// axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/user-details`, {
//   withCredentials: true
// })
