import { createSlice } from "@reduxjs/toolkit";

// Initial state of the cart
const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

// Cart slice definition
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        fetchCart(state, action) {
            const items = action.payload;
            state.items = items;
            state.totalQuantity = items.reduce(
                (total, item) => total + item.quantity,
                0
            );
            state.totalPrice = items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
        },
        addItem(state, action) {
            const { book, price, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.book === book);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ book, price, quantity });
            }

            state.totalQuantity += quantity;
            state.totalPrice += price * quantity;
        },
        updateItemQuantity(state, action) {
            const { book, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.book === book);

            if (existingItem) {
                const previousQuantity = existingItem.quantity;
                existingItem.quantity = quantity;

                state.totalQuantity += quantity - previousQuantity;
                state.totalPrice +=
                    quantity * existingItem.price -
                    previousQuantity * existingItem.price;
            }
        },
        removeItem(state, action) {
            const book = action.payload;
            const existingItem = state.items.find((item) => item.book === book);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.price * existingItem.quantity;
                state.items = state.items.filter((item) => item.book !== book);
            }
        },
    },
});

// Export actions and reducer
export const { fetchCart, addItem, updateItemQuantity, removeItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
