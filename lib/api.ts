import { CreateProductParams, Product } from '@/types';

const BASE_URL = 'https://fakestoreapi.com';

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    try {
        const res = await fetch(`${BASE_URL}${url}`, {
            ...options,
        });
        if (!res.ok) {
            console.error(`API Error: ${res.status} ${res.statusText} at ${url}`);
            throw new Error(`API Error: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.error(`Fetch Error at ${url}:`, error);
        throw error;
    }
}

export const getProducts = async (
    sort: 'asc' | 'desc' = 'asc',
    limit?: number
): Promise<Product[]> => {
    const params = new URLSearchParams();
    if (sort) params.append('sort', sort);
    if (limit) params.append('limit', String(limit));

    return fetcher<Product[]>(`/products?${params.toString()}`);
};

export const getProductsByCategory = async (category: string, sort: 'asc' | 'desc' = 'asc'): Promise<Product[]> => {
    return fetcher<Product[]>(`/products/category/${category}?sort=${sort}`);
};

export const getProduct = async (id: string): Promise<Product> => {
    return fetcher<Product>(`/products/${id}`);
};

export const getCategories = async (): Promise<string[]> => {
    return fetcher<string[]>('/products/categories');
};

export const createProduct = async (product: CreateProductParams): Promise<Product> => {
    return fetcher<Product>('/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

