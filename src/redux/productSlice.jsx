import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUS = Object.freeze({
    IDLE: "IDLE",
    LOADING: "LOADING",
    SUCCESS: "SUCCESS",
    FAIL: "FAIL"
})

const initialState = {
    products: [],
    searchQuery: "" // Search
}

export const getProducts = createAsyncThunk('getproducts', async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json();
    return data;
})

export const getCategoryProducts = createAsyncThunk('getcategory', async (category) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`)
    const data = await response.json();
    return data;
})

export const getDetailProducts = createAsyncThunk('getdetailproducts', async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    const data = await response.json();
    return data;
})

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.productsStatus = STATUS.LOADING
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.productsStatus = STATUS.SUCCESS;
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state) => {
                state.productsStatus = STATUS.FAIL
            })
            .addCase(getDetailProducts.pending, (state) => {
                state.productDetailStatus = STATUS.LOADING
            })
            .addCase(getDetailProducts.fulfilled, (state, action) => {
                state.productDetailStatus = STATUS.SUCCESS;
                state.productDetail = action.payload
            })
            .addCase(getDetailProducts.rejected, (state) => {
                state.productDetailStatus = STATUS.FAIL
            })
            .addCase(getCategoryProducts.pending, (state) => {
                state.productsStatus = STATUS.LOADING
            })
            .addCase(getCategoryProducts.fulfilled, (state, action) => {
                state.productsStatus = STATUS.SUCCESS;
                state.products = action.payload
            })
            .addCase(getCategoryProducts.rejected, (state) => {
                state.productsStatus = STATUS.FAIL
            })
    }
})
export const { setSearchQuery } = productSlice.actions;

export default productSlice.reducer;
