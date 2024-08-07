import {
  setLoading,
  resetLoading,
  setError,
  setProducts,
  setProductTypes,
} from "../slices/product";
import axios from "axios";

// CODE FOR PRODUCT_TYPES
export const getAllProductTypes = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get("/api/product-type/get-all-product-types");
    
    // Convert the JSON object to a regular JavaScript object if necessary
    const productTypesObject = JSON.parse(JSON.stringify(data));
    
    // Dispatch the action with the object of product types
    dispatch(setProductTypes(productTypesObject));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occurred. Please try again later."
      )
    );
  }
};

// CODE FOR PRODUCTS
export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const { data } = await axios.post('/api/product/create-product', formData, config);

    dispatch(resetLoading());
    return data;
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occurred. Please try again later."
      )
    );
    throw error;
  }
}
