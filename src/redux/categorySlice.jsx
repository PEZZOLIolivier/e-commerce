import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    selectedCategory: null
}

export const getCategories = createAsyncThunk('category', async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories')
    const data = response.json();
    return data;
})

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
    }
})

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;