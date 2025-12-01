import axios from 'axios';

// API Response wrapper
interface ApiResponse<T> {
    success: boolean;
    data: T;
    error: any;
}

// Axios instance with default config
const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export interface Product {
    productId: number;
    categoryId: number;
    productName: string;
    productStatus: string;
    price: number;
    image: string;
    categoryName?: string;
}

export interface Category {
    categoryId: number;
    categoryName: string;
}

export const productService = {
    // Get Product List
    getProductList: async (): Promise<Product[]> => {
        const response = await apiClient.get<ApiResponse<Product[]>>('/api/product');
        return response.data.data;
    },

    // Get Product Detail
    getProduct: async (productId: number): Promise<Product> => {
        const response = await apiClient.get<Product>(`/api/product/${productId}`);
        return response.data;
    },

    // Get Category List
    getCategories: async (): Promise<Category[]> => {
        const response = await apiClient.get<ApiResponse<Product[]>>('/api/product/categorie');
        return response.data.data as any;
    },

    // Add Product
    addProduct: async (product: Omit<Product, 'productId'>): Promise<void> => {
        await apiClient.post('/api/product', product);
    },

    // Update Product
    updateProduct: async (product: Product): Promise<void> => {
        await apiClient.put('/api/product', product);
    },

    // Delete Product
    deleteProduct: async (productId: number): Promise<void> => {
        await apiClient.delete(`/api/product/${productId}`);
    },

    // Upload Image
    uploadImage: async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await apiClient.post<string>('/api/product/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
};
