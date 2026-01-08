import type { Seller } from "@/types/selling.types";
import type { CreateSeller, UpdateSeller } from "@/types/selling.types";
import axios from "axios";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "https://localhost:7260/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

//Reusing the same request interceptor from authService to attach token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

//Getting seller profile
export const getSellerProfile = async (): Promise<Seller> => {
    const response = await api.get<Seller>("/Seller/my-seller-profile");
    return response.data;
}

//Create seller profile
export const createSellerProfile = async (data: CreateSeller): Promise<Seller> => {
    const response = await api.post<Seller>("/Seller/create-seller", data);
    return response.data;
}

//Update seller profile
export const updateSellerProfile = async (data: UpdateSeller): Promise<Seller> => {
    const response = await api.put<Seller>("/Seller/update-seller-profile", data);
    return response.data;
}

//Get Seller by ID
export const getSellerById = async (_sellerId: number): Promise<Seller> => {
    const response = await api.get<Seller>(`/Seller/seller-id/{sellerId:int}`);
    return response.data;
}

//Delete Seller Profile
export const deleteSellerProfile = async (): Promise<void> => {
    await api.delete("/Seller/delete-my-seller-profile");
}

