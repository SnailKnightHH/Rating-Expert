import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  loggedIn: false,
  user: null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser(state, action) {
      state.status = "succeeded";
      state.loggedIn = true;
      state.user = action.payload;
    },
  },
});

export const { signInUser } = userSlice.actions;

export default userSlice.reducer;
