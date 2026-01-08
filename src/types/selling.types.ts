//for auth
export interface LogInRequest {
    email: string;
    password: string;
}

export interface LogInResponse {
    token: string;
    user: User;
}

export interface User {
    userName: string;
    email: string;
}

export interface CreateUser {
    userName: string;
    email: string;
    password: string;
}

//for category
export interface Category {
    name: string;
    description?: string;
}

export interface CreateCategory {
    name: string;
    description?: string;
}

export interface UpdateCategory {
    name?: string;
    description?: string;
}

//for product
export interface Product {
    productId: number;
    sellerId: number;
    categoryId: number;
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

//for inventory
export interface Inventory {
    inventoryId: number;
    sellerId: number;
    productId: number;
    quantityAvailable: number;
    lastStockUpdate: Date;
    status: string;
}

export interface CreateInventory {
    productId: number;
    quantityAvailable: number;
}

export interface UpdateInventory {
    quantityAvailable?: number;
}

//for seller
export interface Seller {
    sellerId: number;
    userId: number;
    storeName: string;
    storeDescription?: string;
    returnPolicy?: string;
    Status: string;
    createdAt: Date;
    city?: string;
    country?: string;
    zipCode?: number;
    region?: string;
    addressLine?: string;
}

export interface CreateSeller {
    storeName: string;
    storeDescription?: string;
    returnPolicy?: string;
    status: string;
    city?: string;
    country?: string;
    zipCode?: number;
    region?: string;
    addressLine?: string;
}

export interface UpdateSeller {
    storeName?: string;
    storeDescription?: string;
    returnPolicy?: string;
    status?: string;
    city?: string;
    country?: string;
    zipCode?: number;
    region?: string;
    addressLine?: string;
}
