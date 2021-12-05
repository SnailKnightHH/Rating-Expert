import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../Constants/constants";

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
    await axios.post(`${baseURL}/main/:category/createInstance`, {
      ...instance,
    });
    return instance;
  }
);

export const fetchAllInstances = createAsyncThunk(
  "instances/fetchAllInstances",
  async (userId) => {
    console.log("in fetchAllInstances");
    const resp = await axios.get(`${baseURL}/main/:category`, {
      params: { userId },
    });
    return { instances: resp.data };
  }
);

const instancesSlice = createSlice({
  name: "instances",
  initialState,
  reducers: {
    changeStatusToIdle(state, action) {
      state.status = "idle";
    },
  },
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
    [fetchAllInstances.pending]: (state) => {
      state.status = "pending";
    },
    [fetchAllInstances.rejected]: (state, action) =>
      errorReponse(state, action),
    [fetchAllInstances.fulfilled]: (state, action) => {
      if (action.payload) {
        const { instances } = action.payload;
        if (instances != null) {
          instancesAdapter.setAll(state, instances);
          state.status = "succeeded";
          // window.location.reload(false);
        }
      } else {
        state.error = "Error Retrieving instances: received null value";
        state.status = "failed";
      }
    },
  },
});

export const {
  selectAll: selectAllInstances,
  selectById: selectInstanceById,
  selectIds: getInstanceIdsArray,
} = instancesAdapter.getSelectors((state) => state.instances);

export const { changeStatusToIdle } = instancesSlice.actions;

export default instancesSlice.reducer;
