import axios from 'axios';
import { API_ENDPOINTS } from './endpoints';
import {
  getSuperloginToken,
  clearSuperloginToken,
} from '../services/inphbSuperloginService';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (!config.url?.includes(API_ENDPOINTS.SUPERLOGIN)) {
      const token = await getSuperloginToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config.url, response.status);
    return response.data;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    if (error.response?.status === 401) {
      clearSuperloginToken(); // token may have expired — force a fresh one next call
      console.log('We got a fresh new token');
    }
    const message = error.response?.data?.message || error.message;
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
