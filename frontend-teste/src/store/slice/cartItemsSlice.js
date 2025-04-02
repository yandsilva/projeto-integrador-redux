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

    addNewCartItemsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewCartItemsSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },
    addNewCartItemsFailed(state, action) {
      state.message = null;
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
      },
    );

    dispatch(
      cartItemsSlice.actions.getAllCartItemsSuccess(data.cart.CartItems),
    );
    console.log(data.cart.CartItems);
    dispatch(cartItemsSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      cartItemsSlice.actions.getAllCartItemsFailed(error.response.data.message),
    );
  }
};

export const addItemToCart = (productId, userId) => async (dispatch) => {
  dispatch(cartItemsSlice.actions.addNewCartItemsRequest());
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/cart/add-to-cart",
      {
        productId,
        userId,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    dispatch(cartItemsSlice.actions.addNewCartItemsSuccess(response.data));
    dispatch(cartItemsSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      cartItemsSlice.actions.addNewCartItemsFailed(error.response.data.message),
    );
  }
};

export const clearAllCartItemsSliceErrors = () => async (dispatch) => {
  dispatch(cartItemsSlice.actions.clearAllErrors());
};

export default cartItemsSlice.reducer;
