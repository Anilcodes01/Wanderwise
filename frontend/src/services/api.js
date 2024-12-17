import axios from 'axios';

const VITE_BACKEND_URL="https://wanderwise-yvxl.vercel.app/api"

const API_URL = VITE_BACKEND_URL 
console.log(API_URL)

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const handleApiError = (error) => {
  const message = error.response?.data?.error || 'An unexpected error occurred';
  console.error('API Error:', message);
  return message;
};