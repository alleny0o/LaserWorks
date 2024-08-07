import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  products: [],
  singleProduct: null,
  productTypes: {},
};

export const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    resetLoading: state => {
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    setProducts: (state, { payload }) => {
      state.products = payload;
      state.loading = false;
      state.error = null;
    },
    setProductTypes: (state, { payload }) => {
      state.productTypes = payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, resetLoading, setError, setProducts, setProductTypes } =
  productSlice.actions;
export default productSlice.reducer;
