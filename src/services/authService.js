import api from "../api/steel";

export const register = async (credentials) => {
    const response = await api.post('/auth/sign-up', credentials);
    return response;
}

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response;
}

export const logout = async () => {
    const response = await api.post('/auth/logout');
    return response;
}

export const updatePassword = async (id, passwordData) => {
    const response = await api.patch(`/auth/password/${id}`, passwordData);
    return response;
}