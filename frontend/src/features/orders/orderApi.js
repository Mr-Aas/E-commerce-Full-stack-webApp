import api from "../../api/axios";

export const getOrders = async () => {
    const res = await api.get("/orders");
    return res.data;
};

// DELIVER
export const deliverOrder = async (id) => {
    const res = await api.put(`/orders/${id}/deliver`);
    return res.data;
};

// CANCEL
export const cancelOrder = async (id) => {
    const res = await api.put("/orders/${id}/cancel");
    return res.data;
};

// GET SALES
export const getSales = async () => {
    const res = await api.get("/orders/sales");
    return res.data;
};