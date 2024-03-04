import { createSlice } from "@reduxjs/toolkit";


const fetchFromLocalStorage = () => {
    let cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(localStorage.getItem('cart'));
    } else {
        return [];
    }
}

const storeInLocalStorage = (data) => {
    localStorage.setItem('cart', JSON.stringify(data))
}


const initialState = {
    carts: fetchFromLocalStorage(),
    itemCount: 0,
    totalAmount: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isItemCart = state.carts.find(item => item.id === action.payload.id);

            if (isItemCart) {
                state.carts = state.carts.map(item =>
                    item.id === action.payload.id
                        ? {
                            ...item,
                            quantity: item.quantity + action.payload.quantity,
                            totalPrice: item.totalPrice + action.payload.price,
                        }
                        : item
                );
            } else {
                state.carts.push(action.payload);
            }
            storeInLocalStorage(state.carts);
            // Dispatch the getCartTotal action after updating the cart
            state.itemCount = state.carts.reduce((totalQuantity, cartItem) => {
                return totalQuantity + cartItem.quantity;
            }, 0);
            state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
                return cartTotal + cartItem.price * cartItem.quantity;
            }, 0);
        },
        removeFromCart: (state, action) => {
            const tempCart = state.carts.filter(item => item.id !== action.payload);
            state.carts = tempCart;
            storeInLocalStorage(state.carts);
        },
        clearCart: (state) => {
            state.carts = [];
            storeInLocalStorage(state.carts);
        },
        getCartTotal: (state) => {
            state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
                return cartTotal += cartItem.price * cartItem.quantity
            }, 0)
            state.itemCount = state.carts.reduce((totalQuantity, cartItem) => {
                return totalQuantity += cartItem.quantity;
            }, 0);
        }
    }
})

export const { addToCart, removeFromCart, clearCart, getCartTotal } = cartSlice.actions;
export default cartSlice.reducer;