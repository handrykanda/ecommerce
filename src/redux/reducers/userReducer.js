import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  IS_COMPLETE,
  IS_NOT_COMPLETE,
} from "../types";

const initialState = {
  loading: false,
  isComplete: false,
  authenticated: false,
  credentials: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };

    case SET_UNAUTHENTICATED:
      return initialState;

    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case IS_COMPLETE:
      return {
        ...state,
        isComplete: true,
      };
    case IS_NOT_COMPLETE:
      return {
        ...state,
        isComplete: false,
      };
    default:
      return state;
  }
}
