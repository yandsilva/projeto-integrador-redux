import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import addressReducer from "./slice/addressSlice";
import productReducer from "./slice/productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    address: addressReducer,
    product: productReducer,
  },
});
