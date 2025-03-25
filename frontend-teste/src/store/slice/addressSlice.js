import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    getAllAddressRequest(state, action) {
      state.address = [];
      state.error = null;
      state.loading = true;
    },
    getAllAddressSuccess(state, action) {
      state.address = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllAddressFailed(state, action) {
      state.address = state.address;
      state.error = action.payload;
      state.loading = false;
    },

    addNewAddressRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewAddressSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },
    addNewAddressFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },

    deleteAddressRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteAddressSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },
    deleteAddressFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },

    resetAddressSlice(state, action) {
      state.error = null;
      state.message = null;
      state.address = state.address;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.address = state.address;
    },
  },
});

export const getAllAddress = () => async (dispatch) => {
  dispatch(addressSlice.actions.getAllAddressRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/address/getAddress",
      { withCredentials: true }
    );

    dispatch(addressSlice.actions.getAllAddressSuccess(data.address));
    dispatch(addressSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      addressSlice.actions.getAllAddressFailed(error.response.data.message)
    );
  }
};

export const addNewAddress = (data) => async (dispatch) => {
  dispatch(addressSlice.actions.addNewAddressRequest());
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/address/register",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(addressSlice.actions.addNewAddressSuccess(response.data.message));
    dispatch(addressSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      addressSlice.actions.addNewAddressFailed(error.response.data.message)
    );
  }
};

export const deleteAddress = (id) => async (dispatch) => {
  dispatch(addressSlice.actions.deleteAddressRequest());
  try {
    const { data } = await axios.delete(
      `http://localhost:8000/api/v1/address/deleteAddress/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(addressSlice.actions.deleteAddressSuccess(data.message));
    dispatch(addressSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      addressSlice.actions.deleteAddressFailed(error.response.data.message)
    );
  }
};

export const clearAllAddressSliceErrors = () => async (dispatch) => {
  dispatch(addressSlice.actions.clearAllErrors());
};

export const resetAddressSlice = () => async (dispatch) => {
  dispatch(addressSlice.actions.resetAddressSlice());
};

export default addressSlice.reducer;
