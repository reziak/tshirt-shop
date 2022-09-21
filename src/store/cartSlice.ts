import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from ".";

type Item = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  defaultPriceId: string;
}

interface CartState {
  isCartVisible: boolean;
  items: Item[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  isCartVisible: false,
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      if (idx < 0) {
        state.items.push(action.payload);
        state.totalItems += 1;
        state.totalPrice = state.items.reduce((acc, item) => {
          return acc + (item.price * item.quantity);
        }, 0);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const idx = state.items.findIndex((i) => i.id === action.payload);
      state.items.splice(idx, 1);
      state.totalItems -= 1;
      state.totalPrice = state.items.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
      }, 0);
    },
    toggleCartVisibility: (state) => {
      state.isCartVisible = !state.isCartVisible;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log(state, action);
      return {
        ...state,
        ...action.payload.cart,
      };
    },
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  toggleCartVisibility 
} = cartSlice.actions;

export const selectIsCartVisible = (state: RootState) => 
  state.cart.isCartVisible;
export const selectItems = (state: RootState) => state.cart.items;
export const selectTotalItems = (state: RootState) => state.cart.totalItems;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectIsItemInCart = (state: RootState, id: string) => {
  const idx = state.cart.items.findIndex((i) => i.id === id);
  return !(idx < 0);
}

export default cartSlice.reducer;
