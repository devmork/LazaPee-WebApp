export interface seller {
  storeName: string;
  storeDescription: string;
  returnPolicy: string;
  city: string;
  country: string;
  zipCode: number;
  region: string;
  addressLine: string;
}

export interface createSeller {
  storeName: string;
  storeDescription: string;
  returnPolicy: string;
  city: string;
  country: string;
  zipCode: number;
  region: string;
  addressLine: string;
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