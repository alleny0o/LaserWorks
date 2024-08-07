import axios from 'axios';
import {
  setLoading,
  setError,
  setCategories,
  setCurrentCategory,
} from '../slices/category';

const API_URL = '/api/category';

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(API_URL);
    dispatch(setCategories(data));
  } catch (error) {
    dispatch(setError(getErrorMessage(error)));
  }
};

export const getCategory = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(`${API_URL}/${id}`);
    dispatch(setCurrentCategory(data));
  } catch (error) {
    dispatch(setError(getErrorMessage(error)));
  }
};

export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.post(API_URL, categoryData);
    dispatch(setCurrentCategory(data));
    return data;
  } catch (error) {
    dispatch(setError(getErrorMessage(error)));
    throw error;
  }
};

export const updateCategory = (id, categoryData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.put(`${API_URL}/${id}`, categoryData);
    dispatch(setCurrentCategory(data));
    return data;
  } catch (error) {
    dispatch(setError(getErrorMessage(error)));
    throw error;
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await axios.delete(`${API_URL}/${id}`);
    dispatch(setCurrentCategory(null));
  } catch (error) {
    dispatch(setError(getErrorMessage(error)));
  }
};

const getErrorMessage = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
    ? error.message
    : 'An unexpected error has occurred. Please try again later.';
};