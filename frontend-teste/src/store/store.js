import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import addressReducer from "./slice/addressSlice";
import productReducer from "./slice/productSlice";
import forgotResetPasswordReducer from "./slice/forgotResetPasswordSlice";
import cartItemsReducer from "./slice/cartItemsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotResetPasswordReducer,
    address: addressReducer,
    product: productReducer,
    cartItems: cartItemsReducer,
  },
});
