import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  IS_COMPLETE,
  IS_NOT_COMPLETE,
} from "../types";
import axios from "axios";

// login user action creator
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(() => {
      dispatch({
        type: SET_ERRORS,
        payload: "Something went wrong, it might be your network connection!",
      });
    });
};

//signup action creator
export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// logut user action creator
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

//get authenticated user's details
export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: IS_COMPLETE });
    })
    .catch((err) => {
      if (err.response.data) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      }

      dispatch({ type: IS_NOT_COMPLETE });
    });
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
