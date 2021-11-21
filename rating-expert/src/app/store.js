import { configureStore } from "@reduxjs/toolkit";
import instanceReducer from "../Pages/instanceSlice";

export default configureStore({
  reducer: { instances: instanceReducer },
});
