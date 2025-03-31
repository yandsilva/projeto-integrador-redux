import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    getAllProductsRequest(state, action) {
      state.product = [];
      state.error = null;
      state.loading = true;
    },
    getAllProductsSuccess(state, action) {
      state.product = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllProductsFailed(state, action) {
      state.product = state.product;
      state.error = action.payload;
      state.loading = false;
    },

    addNewProductRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewProductSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },
    addNewProductFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },

    deleteProductRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteProductSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },
    deleteProductFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },

    resetProductSlice(state, action) {
      state.error = null;
      state.message = null;
      state.product = state.product;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.message = null;
      state.product = state.product;
    },
  },
});

export const getAllProduct = () => async (dispatch) => {
  dispatch(productSlice.actions.getAllProductsRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/product/getall",
      { withCredentials: true }
    );
    dispatch(productSlice.actions.getAllProductsSuccess(data.products));
    dispatch(productSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      productSlice.actions.getAllProductsFailed(error.response.data.message)
    );
  }
};

export const addNewProduct = (data) => async (dispatch) => {
  dispatch(productSlice.actions.addNewProductRequest());
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/product/add",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(productSlice.actions.addNewProductSuccess(response.data.message));
    dispatch(productSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      productSlice.actions.addNewProductFailed(error.response.data.message)
    );
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(productSlice.actions.deleteProductRequest());
  try {
    const { data } = await axios.delete(
      `http://localhost:8000/api/v1/product/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(productSlice.actions.deleteProductSuccess(data.message));
    dispatch(productSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      productSlice.actions.deleteProductFailed(error.response.data.message)
    );
  }
};

export const resetProductSlice = () => async (dispatch) => {
  dispatch(productSlice.actions.resetProductSlice());
};

export const clearAllProductSliceErrors = () => async (dispatch) => {
  dispatch(productSlice.actions.clearAllErrors());
};

export default productSlice.reducer;
