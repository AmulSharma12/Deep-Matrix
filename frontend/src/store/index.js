import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import activate from "./activateSlice";

// 1. creating redux store
export const store = configureStore({
  reducer: {
    auth,
    activate,
  },
});

// 2. provide the redux store to react
// import provider from react redux in root component index.js
// this will allow to utilise redux store to react
