import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
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
    list: (params) => ['products', 'list', params],
    infinite: (filters) => ['products', 'infinite', filters],
    detail: (id) => ['products', id],
    slug: (slug) => ['products', 'slug', slug],
};

// ── Página pública /products — Infinite scroll ──
// data.pages es un array de { products, meta } por cada página cargada.
// Usar: data.pages.flatMap(p => p.products) para obtener todos los productos acumulados.
export const useProductsInfinite = (filters = {}) => {
    return useInfiniteQuery({
        queryKey: productKeys.infinite(filters),
        queryFn: ({ pageParam = 1 }) => fetchProducts({ ...filters, page: pageParam }),
        getNextPageParam: (lastPage) =>
            lastPage.meta.currentPage < lastPage.meta.totalPages
                ? lastPage.meta.currentPage + 1
                : undefined,
        initialPageParam: 1,
    });
};

// data = { products, meta }
export const useProducts = (params = {}) => {
    return useQuery({
        queryKey: productKeys.list(params),
        queryFn: () => fetchProducts(params),
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
