import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  categories: {},
  currentCategory: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    setCategories: (state, { payload }) => {
      state.categories = payload;
      state.error = null;
      state.loading = false;
    },
    setCurrentCategory: (state, { payload }) => {
      state.currentCategory = payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, setCategories, setCurrentCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
