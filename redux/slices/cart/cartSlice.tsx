import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the CartItem type
interface CartItem {
    enName: string;
    image: string;
    enPrice: string;
    enNetPrice: string;
    arName: string;
    arPrice: string;
    arNetPrice: string;
    id: string;
    enCategory: string;
    arCategory: string;
    arDescription: string;
    enDescrition: string;
    quantity: number;
}

// Load the cart from local storage, with type safety
const localCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || `[]`);
console.log(localCart);

// Define the initial state with the correct type
interface CartState {
    cart: CartItem[];
}

const initialState: CartState = {
    cart: localCart, // Optionally initialize the cart with items from local storage
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const tempcart = state.cart.filter(
                (item) => item.id === action.payload.id
            );
            if (tempcart.length < 1) {
                state.cart.push(action.payload); // Add the payload to the cart
                localStorage.setItem("cart", JSON.stringify(state.cart)); // Update local storage
            }
        },
        removeFromCart: (state, action: PayloadAction<CartItem>) => {
            let tempState = state.cart;
            const newState = tempState.filter(
                (item) => item.id !== action.payload.id
            );
            console.log(newState);
            // Add the payload to the cart
            localStorage.setItem("cart", JSON.stringify(newState)); // Update local storage
            state.cart = newState;
        },
        increaseQuantity: (state, action: PayloadAction<CartItem>) => {
            let tempState = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            });

            // Add the payload to the cart
            localStorage.setItem("cart", JSON.stringify(tempState)); // Update local storage
            state.cart = tempState;
        },
        decreaseQuantity: (state, action: PayloadAction<CartItem>) => {
            let tempState = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return item;
                }
            });

            // Add the payload to the cart
            localStorage.setItem("cart", JSON.stringify(tempState)); // Update local storage
            state.cart = tempState;
        },
    },
});

// Export the action and reducer
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
    cartSlice.actions;
export default cartSlice.reducer;
