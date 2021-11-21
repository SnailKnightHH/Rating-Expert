import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const errorReponse = (state, action) => {
  state.status = "failed";
  state.error = action.error.message;
};

const instancesAdapter = createEntityAdapter({
  selectId: (instance) => instance.id,
  sortComparer: (a, b) => a.date > b.date, // not verified
});

const initialState = instancesAdapter.getInitialState({
  status: "idle",
  error: null,
  filter: {
    category: null,
    query: "",
  },
});

export const createInstance = createAsyncThunk(
  "instances/createInstance",
  async (instance) => {
    console.log("in createInstance");
    await axios.post("/main/:Category/createInstance", { ...instance });
    return instance;
  }
);

const instancesSlice = createSlice({
  name: "instances",
  initialState,
  reducers: {},
  extraReducers: {
    [createInstance.pending]: (state) => {
      state.status = "pending";
    },
    [createInstance.rejected]: (state, action) => errorReponse(state, action),
    [createInstance.fulfilled]: (state, action) => {
      const instance = action.payload;
      instancesAdapter.upsertOne(state, instance);
      state.status = "succeeded";
    },
  },
});

export const {
  selectAll: selectAllInstances,
  selectById: selectInstanceById,
  selectIds: getInstanceIdsArray,
} = instancesAdapter.getSelectors((state) => state.instances);

// export const { actions } = instancesSlice.actions;

export default instancesSlice.reducer;
