import api from "./axios";

// GET ALL PRODUCTS
export const getProducts = () => api.get("/products");

// DELETE PRODUCT
export const deleteProduct = (id) =>
    api.delete(`/products/${id}`);

// GET SINGLE PRODUCT
export const getProductById = (id) =>
    api.get(`/products/${id}`);

// UPDATE PRODUCT
export const updateProduct = (id, data) =>
    api.put(`/products/${id}`, data);