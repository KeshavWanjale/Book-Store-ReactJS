import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./slice/bookSlice";
import { cartReducer } from "./slice/cartSlice";
import { addressReducer } from "./slice/addressSlice";
import { orderReducer } from "./slice/orderSlice";


export const store = configureStore({
    reducer: {
        books: bookReducer,
        cart: cartReducer,
        address: addressReducer,
        orders: orderReducer,
    }
});

export default store