import { configureStore } from "@reduxjs/toolkit";
import machineReducer from "./machineSlice";

export const store = configureStore({
  reducer: {
    machines: machineReducer,
  },
});