import { configureStore } from "@reduxjs/toolkit";
import slotsReducer from "./slices/slots-slice.js";
import userReducer from "./slices/user-slice.js";
import businessReducer from './slices/business-slice.js'
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    user: userReducer,
    slots: slotsReducer,
    business: businessReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
});

setupListeners(store.dispatch);

export * from "./slices/user-slice";
export * from "./slices/slots-slice";
export * from "./slices/business-slice";
export * from "./thunks/user-thunk";
export * from "./thunks/slots-thunk";
export * from "./thunks/business-thunk";
