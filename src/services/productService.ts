import axios from "axios";
import type { Product } from "../types/product.types";
import type { CreateProduct, UpdateProduct } from "@/types/selling.types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://localhost:7260/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("/Product");
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/Product/${id}`);
  return response.data;
};

export const getSellerProducts = async (sellerId: number): Promise<Product[]> => {
  const response = await api.get<Product[]>(`/Product/seller/${sellerId}`);
  return response.data;
};

export const createProduct = async (
  productData: CreateProduct
): Promise<Product> => {
  const response = await api.post<Product>("/Product", productData);
  return response.data;
};

export const updateProduct = async (
  id: number,
  productData: UpdateProduct
): Promise<Product> => {
  const response = await api.put<Product>(`/Product/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/Product/${id}`);
};
