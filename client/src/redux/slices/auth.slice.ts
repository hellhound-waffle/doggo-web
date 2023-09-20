import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { RootState } from "../store";

export interface Idata {
  username: string;
  login: string;
  password: string;
}

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (userData: Idata) => {
    const { data } = await axios.post("/auth/reg", userData);

    return data;
  },
);

export const fetchMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const data = await axios.get("/auth/me");

  return data;
});

const initialState = {
  data: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(createUser.rejected, state => {
      state.status = "failed";
    });
    builder.addCase(createUser.pending, state => {
      state.status = "loading";
    });
  },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);

export const { actions, reducer } = authSlice;
