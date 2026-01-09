import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7260/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProductInventory = async (productId: number) => {
  const response = await api.get(`/Inventory/product/${productId}`);
  return response.data;
};

export const setProductStock = async (productId: number, quantity: number) => {
  const payload = { productId, quantityAvailable: quantity };
  const response = await api.post('/Inventory', payload);
  return response.data;
};
