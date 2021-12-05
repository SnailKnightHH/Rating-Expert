import { configureStore } from "@reduxjs/toolkit";
import instanceReducer from "../Pages/instanceSlice";
import userReducer from "../Pages/userSlice";

export default configureStore({
  reducer: { instances: instanceReducer, user: userReducer },
});
