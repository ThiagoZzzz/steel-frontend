import api from "../api/steel";

export const fetchUsers = async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const url = qs ? `/users?${qs}` : '/users';
    const { data, meta } = await api.get(url);
    return { users: data.users, meta };
}

export const fetchProfile = async (id) => {
    const { data } = await api.get(`/users/${id}`)
    return data.user;
}

export const fetchUserOrders = async (id) => {
    const { data } = await api.get(`/users/${id}/orders`)
    return data.orders;
}

export const updateUser = async (id, updateData) => {
    const { data, message } = await api.patch(`/users/${id}`, updateData);
    return { data, message };
}

export const updateUserRole = async (id, role) => {
    const { data } = await api.patch(`/users/${id}/role`, { role });
    return data;
}

export const revokeUserRole = async (id, role) => {
    const { data } = await api.patch(`/users/${id}/revoke-role`, { role });
    return data;
}

export const deleteUser = async (id) => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
}