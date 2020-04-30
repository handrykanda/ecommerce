# **React + Redux + Firebase Project**

## **Live Demo:**

You can check out the live demo [Here](https://cellstore-a0a6c.web.app/).

## **Getting Started**

To get the frontend running locally:

- Clone this repo

After that create a package.json file in the root and just copy and paste this json object.

```
{
  "name": "cellstore",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@material-ui/core": "^4.9.8",
    "@material-ui/icons": "^4.9.1",
    "@material-ui/lab": "^4.0.0-alpha.47",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "axios": "^0.19.2",
    "jwt-decode": "^2.2.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-paypal-express-checkout": "^1.0.5",
    "react-redux": "^7.2.0",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.4.1",
    "redux": "^4.0.5",
    "redux-thunk": "^2.3.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "YOUR_BASE_URL"
}
```

Take note of the proxy at the bottom. I know you are worried "What's the base_url" but everything is set for you. Just click [here](https://github.com/handrykanda/react-online-shop-backend) to setup your backend with Firebase cloud functions. Don't worry the source code is available for you. You will be up and running in a couple of minutes!

- `npm install` to install all the required dependencies specified in the package file you just created.
- `npm start` to start the local server (this project uses create-react-app)

This will run the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Optional:

But before that you may need to create a file called config.js in src/ and put this line of code:

> `export const SANDBOX_API = "PUT_YOUR_API";`

But if you don't want to test paypal you can skip it.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## **Making requests to the backend API**

The source code for the backend server is [here](https://github.com/handrykanda/react-online-shop-backend).

## **Functionality overview**

Cellstore is an online shopping web app. It uses Firebase Cloud Functions as the backend. You can view a live demo over [here](https://cellstore-a0a6c.web.app/).

### **General functionality:**

- Authenticate users via JWT (login/signup pages).
- GET and display lists of products (cellphones).
- Add to cart functionality
- View selected product details
- Display of cart totals, increase of decrease item quantity on the cart page.
- Collect shippment detail before checkout with paypal.
- [ ] More payment functionality to be added.
