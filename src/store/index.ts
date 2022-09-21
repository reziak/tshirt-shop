import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from "next-redux-wrapper";
import cartReducer from "./cartSlice";

export const makeStore = () => 
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
