import { configureStore } from "@reduxjs/toolkit";
import instanceReducer from "../Pages/instanceSlice";
import userReducer from "../Pages/userSlice";
import themeReducer from "../Pages/themeSlice";

export default configureStore({
  reducer: {
    instances: instanceReducer,
    user: userReducer,
    theme: themeReducer,
  },
});
