import api from "../api/steel";

export const fetchProducts = async () => {
    const { data } = await api.get('/products');
    return data.products;
}

export const fetchProductByID = async (id) => {
    const { data } = await api.get(`/products/${id}`)
    return data;
}

export const fetchProductBySlug = async (slug) => {
    const { data } = await api.get(`/products/search/${slug}`);
    return data.product;
}

export const createProduct = async (dataProduct) => {
    const { data } = await api.post('/products', dataProduct)
    return data;
}

export const updateProduct = async (id, updateData) => {
    const { data } = await api.patch(`/products/${id}`, updateData);
    return data;
}

export const deleteProduct = async (id) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
}