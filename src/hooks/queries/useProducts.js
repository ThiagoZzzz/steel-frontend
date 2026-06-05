import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchProducts,
    fetchProductByID,
    fetchProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../../services/productService';

// query keys
export const productKeys = {
    all: ['products'],
    detail: (id) => ['products', id],
    slug: (slug) => ['products', 'slug', slug],
};

// queries
export const useProducts = () => {
    return useQuery({
        queryKey: productKeys.all,
        queryFn: fetchProducts,
    });
};

export const useProductByID = (id) => {
    return useQuery({
        queryKey: productKeys.detail(id),
        queryFn: () => fetchProductByID(id),
        enabled: !!id,
    });
};

export const useProductBySlug = (slug) => {
    return useQuery({
        queryKey: productKeys.slug(slug),
        queryFn: () => fetchProductBySlug(slug),
        enabled: !!slug,
    });
};

// mutations
export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    // ejecuta la creación y cuando finaliza éxitosamente inválida las querys con key: ['products'], evitando mantener data desactualizada de llamadas anteriores
    return useMutation({
        mutationFn: (dataProduct) => createProduct(dataProduct),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.all });
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updateData }) => updateProduct(id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.all });
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.all });
        },
    });
};
