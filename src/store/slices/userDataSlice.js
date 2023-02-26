import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../apis/userApi";
import { authDataInfo } from "./authDataSlice";

const initialState = {
  newUser: false,
  userAdded: false,
};
const userDataSlice = createSlice({
  name: "userData",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(authDataInfo, (state, action) => {
      if (!action.payload.signedIn) {
        return initialState;
      }
    });
    builder.addMatcher(
      userApi.endpoints.fetchUser.matchFulfilled,
      (state, { payload, meta }) => {
        if (meta.arg.originalArgs && payload.length === 0) {
          state.newUser = true;
        }
      }
    );
    builder.addMatcher(
      userApi.endpoints.addUser.matchFulfilled,
      (state, { payload, meta }) => {
        state.newUser = false;
        state.userAdded = true;
      }
    );
  },
});

export const userDataReducer = userDataSlice.reducer;
