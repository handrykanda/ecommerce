import { LOADING_DATA, SET_PRODUCTS, SET_PRODUCT } from "../types";

const initialState = {
  products: [],
  product: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
}
