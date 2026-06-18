import api from "../api/steel";

export const fetchOrders = async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const url = qs ? `/orders?${qs}` : '/orders';
    const { data, meta } = await api.get(url);
    return { orders: data.orders, meta };
}

export const fetchOrderByID = async (id) => {
    const { data } = await api.get(`/orders/${id}`)
    return data;
}

export const fetchItemsOrder = async (id) => {
    const { data } = await api.get(`/orders/${id}/items`)
    return data.orderItems;
}

export const createOrder = async (dataOrder) => {
    const { data } = await api.post('/orders', dataOrder)
    return data;
}

export const updateOrder = async (id, updateData) => {
    const { data } = await api.patch(`/orders/${id}`, updateData);
    return data;
}

export const deleteOrder = async (id) => {
    const { data } = await api.delete(`/orders/${id}`);
    return data;
}

export const fetchUserOrders = async () => {
    const { data } = await api.get(`/my-orders`);
    return data;
};
