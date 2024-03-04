import { configureStore } from '@reduxjs/toolkit';
import productSlice from './productSlice.jsx';
import categorySlice from "./categorySlice.jsx";
import cartSlice from "./cartSlice.jsx";

const store = configureStore({
    reducer: {
        categories: categorySlice,
        products: productSlice,
        cart: cartSlice
    },
});

export default store;
