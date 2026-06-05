import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register, login, logout, updatePassword } from '../../services/authService';
import { userKeys } from './useUsers';

export const useRegister = () => {
    return useMutation({
        mutationFn: (credentials) => register(credentials)
    });
};

export const useLogin = () => {
    return useMutation({
        mutationFn: (credentials) => login(credentials)
    });
};

export const useLogout = () => {
    return useMutation({
        mutationFn: () => logout()
    });
};

export const useUpdatePassword = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, password, confirmPassword }) => updatePassword(id, { password, confirmPassword }),
        onSuccess: (_, { id }) => {
            // Invalidar el perfil para refrescar datos si es necesario
            queryClient.invalidateQueries({ queryKey: userKeys.profile(id) });
        },
    });
};
