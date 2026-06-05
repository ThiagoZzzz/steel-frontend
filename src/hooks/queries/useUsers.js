import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchUsers,
    fetchProfile,
    fetchUserOrders,
    updateUser,
    updateUserRole,
    revokeUserRole,
    deleteUser,
} from '../../services/userService';

// query keys
export const userKeys = {
    all: ['users'],
    profile: (id) => ['users', id, 'profile'],
    orders: (id) => ['users', id, 'orders'],
};

// queries
export const useUsers = () => {
    return useQuery({
        queryKey: userKeys.all,
        queryFn: fetchUsers,
    });
};

export const useUserProfile = (id) => {
    return useQuery({
        queryKey: userKeys.profile(id),
        queryFn: () => fetchProfile(id),
        enabled: !!id,
    });
};

export const useUserOrders = (id) => {
    return useQuery({
        queryKey: userKeys.orders(id),
        queryFn: () => fetchUserOrders(id),
        enabled: !!id,
    });
};

// mutations
export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updateData }) => updateUser(id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.all });
        },
    });
};

export const useUpdateUserRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, role }) => updateUserRole(id, role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.all });
        },
    });
};

export const useRevokeUserRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, role }) => revokeUserRole(id, role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.all });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.all });
        },
    });
};