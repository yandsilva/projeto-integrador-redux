import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    getAllCartItemsRequest(state, action) {
      state.cartItems = [];
      state.error = null;
      state.loading = true;
    },
    getAllCartItemsSuccess(state, action) {
      state.cartItems = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllCartItemsFailed(state, action) {
      state.cartItems = state.cartItems;
      state.error = action.payload;
      state.loading = false;
    },

    clearAllErrors(state, action) {
      state.error = null;
      state.message = null;
      state.cartItems = state.cartItems;
    },
  },
});

export const getAllCartItems = () => async (dispatch) => {
  dispatch(cartItemsSlice.actions.getAllCartItemsRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/cart/get-cart-items",
      {
        withCredentials: true,
      }
    );
    console.log(data);

    dispatch(cartItemsSlice.actions.getAllCartItemsSuccess(data.cartItems));
    dispatch(cartItemsSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      cartItemsSlice.actions.getAllCartItemsFailed(error.response.data.message)
    );
  }
};

export const clearAllCartItemsSliceErrors = () => async (dispatch) => {
  dispatch(cartItemsSlice.actions.clearAllErrors());
};

export default cartItemsSlice.reducer;
