import {
  SET_PRODUCTS,
  LOADING_DATA,
  SET_PRODUCT,
  LOADING_UI,
  STOP_LOADING_UI,
  CLEAR_ERRORS,
} from "../types";
import axios from "axios";
import { getUserData } from "./userActions";

// Get all products
export const getProducts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/products")
    .then((res) => {
      dispatch({
        type: SET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_PRODUCTS,
        payload: [],
      });
    });
};

//get a product
export const getProduct = (productId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/product/details/${productId}`)
    .then((res) => {
      dispatch({
        type: SET_PRODUCT,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// add to cart
export const addToCart = (productId) => (dispatch) => {
  axios
    .get(`/product/${productId}/incart`)
    .then((res) => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

// remove from cart
export const removeFromCart = (productId) => (dispatch) => {
  axios
    .get(`/product/${productId}/outcart`)
    .then((res) => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

// increase cart quantity
export const increaseQty = (productId) => (dispatch) => {
  axios
    .get(`/product/${productId}/increase`)
    .then((res) => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

// increase cart quantity
export const decreaseQty = (productId) => (dispatch) => {
  axios
    .get(`/product/${productId}/decrease`)
    .then((res) => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};
//clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
