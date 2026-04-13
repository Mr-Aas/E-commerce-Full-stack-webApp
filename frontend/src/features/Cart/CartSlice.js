import { createSlice } from "@reduxjs/toolkit";
// features/cart/cartSlice.js
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalPrice: 0,
    },
    reducers: {
        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                item => item.productId !== action.payload
            );
        },

        increaseQty: (state, action) => {
            const item = state.items.find(
                i => i.productId === action.payload
            );
            if (item) item.quantity++;
        },

        decreaseQty: (state, action) => {
            const item = state.items.find(
                i => i.productId === action.payload
            );
            if (item && item.quantity > 1) item.quantity--;
        },
        addToCart: (state, action) => {
            const item = action.payload;

            const existingItem = state.items.find(
                i => i.productId === item.productId
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push(item);
            }

            state.totalPrice = state.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
        },
    },
});
export const { addToCart, removeFromCart, increaseQty, decreaseQty } = cartSlice.actions;

export default cartSlice.reducer;