import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategories, getProduct, getProducts, getProductsByCategory, createProduct } from '@/lib/api';
import { CreateProductParams } from '@/types';

export const useProducts = (category?: string, sort: 'asc' | 'desc' = 'asc') => {
    return useQuery({
        queryKey: ['products', category, sort],
        queryFn: () => {
            if (category) {
                return getProductsByCategory(category, sort);
            }
            return getProducts(sort);
        },
    });
};

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(id),
        enabled: !!id,
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProduct: CreateProductParams) => createProduct(newProduct),
        onSuccess: () => {
            // In a real app, invalidate queries to refetch list
            // queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};
