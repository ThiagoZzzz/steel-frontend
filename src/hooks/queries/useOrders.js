import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchOrders,
    fetchOrderByID,
    fetchItemsOrder,
    createOrder,
    updateOrder,
    deleteOrder,
} from '../../services/orderService';

// query keys
export const orderKeys = {
    all: ['orders'],
    list: (params) => ['orders', 'list', params],
    detail: (id) => ['orders', id],
    items: (id) => ['orders', id, 'items'],
};

export const useOrders = (params = {}) => {
    return useQuery({
        queryKey: orderKeys.list(params),
        queryFn: () => fetchOrders(params),
    });
};

export const useOrderByID = (id) => {
    return useQuery({
        queryKey: orderKeys.detail(id),
        queryFn: () => fetchOrderByID(id),
        enabled: !!id,
    });
};

export const useOrderItems = (id) => {
    return useQuery({
        queryKey: orderKeys.items(id),
        queryFn: () => fetchItemsOrder(id),
        enabled: !!id,
    });
};

// mutations
export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dataOrder) => createOrder(dataOrder),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderKeys.all });
        },
    });
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updateData }) => updateOrder(id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderKeys.all });
        },
    });
};

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteOrder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderKeys.all });
        },
    });
};
