export interface Product {
    name: string;
    price: number;
    status: number;
    brand: string;
    description?: string;
    imageUrl?: string;
    weight?: number;
    width?: number;
    height?: number;
    length?: number;
}

export interface CreateProduct {
    categoryId: number;
    name: string;
    price: number;
    brand: string;
    description?: string;
    imageUrl?: string;
    weight?: number;
    width?: number;
    height?: number;
    length?: number;
}

export interface UpdateProduct {
    productId: number;
    name?: string;
    price?: number;
    isActive?: boolean;
    description?: string;
}