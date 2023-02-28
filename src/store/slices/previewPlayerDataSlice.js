import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  play: false,
  preview: null,
  previewName: null,
  previewLink: null,
  timerIds: null,
};
const previewPlayerDataSlice = createSlice({
  name: "previewPlayerData",
  initialState,
  reducers: {
    setPreviewPlayerSliceData(state, action) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {},
});
export const { setPreviewPlayerSliceData } = previewPlayerDataSlice.actions;
export const previewPlayerDataReducer = previewPlayerDataSlice.reducer;
