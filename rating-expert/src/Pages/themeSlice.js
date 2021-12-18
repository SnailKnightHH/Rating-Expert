import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  status: "idle",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state, action) {
      state.mode = state.mode === "light" ? "dark" : "light";
      state.status = "succeeded";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
