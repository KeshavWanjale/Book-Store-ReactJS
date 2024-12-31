import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./slice/bookSlice";
import { cartReducer } from "./slice/cartSlice";
import { addressReducer } from "./slice/addressSlice";


export const store = configureStore({
    reducer: {
        books: bookReducer,
        cart: cartReducer,
        address: addressReducer,
    }
});

export default store