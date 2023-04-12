import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signedIn: false,
  authUserId: null,
  userName: null,
  email: null,
  showError: false,
  errorMessage: null,
  token: null,
  validRoute: false,
  showAutoLogout: false,
  showAutoLogin: false,
  showLoginSwitch: false,
};
const authDataSlice = createSlice({
  name: "authData",
  initialState,
  reducers: {
    authDataInfo(state, action) {
      return { ...state, ...action.payload };
    },
    validRoute(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { authDataInfo, validRoute } = authDataSlice.actions;
export const authDataReducer = authDataSlice.reducer;
