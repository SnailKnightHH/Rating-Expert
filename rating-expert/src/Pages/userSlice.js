import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  loggedIn: false,
  user: null,
};

// export const fetchUser = createAsyncThunk(
//   "instances/fetchUser",
//   async (userId) => {
//     console.log("in fetchAllInstances");
//     const resp = await axios.get(`${baseURL}/main/:category`, {
//       params: { userId },
//     });
//     return { instances: resp.data };
//   }
// );

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
