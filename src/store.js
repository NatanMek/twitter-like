import thunk from "redux-thunk";
import {
  applyMiddleware,
  compose,
  createStore,
} from "@reduxjs/toolkit";
import twitterReducer from "./store/twitterStore";

const middleware = [thunk];

const reduxDevTools = compose(applyMiddleware(...middleware));

const store = createStore(twitterReducer, reduxDevTools);

export default store;
