import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// mui stuff
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

//pages
import home from "./pages/home";
import cart from "./pages/cart";
import signup from "./pages/signup";
import login from "./pages/login";
import details from "./pages/details";
import defaultPage from "./pages/defaultPage";
import checkout from "./pages/checkout";
//components
import Navbar from "./components/layout/Navbar";
import customTheme from "./util/theme";
import AuthRoute from "./util/AuthRoute";
import { BASE_URL } from "./config";

axios.defaults.baseURL = BASE_URL;

const theme = createMuiTheme(customTheme);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/cart" component={cart} />
              <Route exact path="/checkout" component={checkout} />
              <Route
                exact
                path="/product/:title/:productId"
                component={details}
              />
              <Route component={defaultPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
