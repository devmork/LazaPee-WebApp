import axios from 'axios';
import type { Product } from '../types/product.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7260/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/product');
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData: any): Promise<Product> => {
  const response = await api.post<Product>('/products', productData);
  return response.data;
};

export const updateProduct = async (id: number, productData: any): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};