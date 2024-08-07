import { combineReducers, configureStore } from "@reduxjs/toolkit";
import product from './slices/product';
import category from './slices/category';

const reducer = combineReducers({ product, category });

export default configureStore({ reducer });
