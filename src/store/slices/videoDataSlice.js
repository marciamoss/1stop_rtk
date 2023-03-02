import { createSlice } from "@reduxjs/toolkit";
import { videoApi } from "../apis/videoApi";

const initialState = {
  listFetching: false,
  searchResults: [],
  savedVideos: [],
  savedId: "",
  saveFailId: "",
  deleteFailId: "",
};

const videoDataSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoSliceData(state, action) {
      return { ...state, ...action.payload };
    },
    resetVideoAlertPopup(state, action) {
      if (action.payload.saveFailId) {
        state.saveFailId = "";
      } else if (action.payload.deleteFailId) {
        state.deleteFailId = "";
      } else if (action.payload.savedId) {
        state.savedId = "";
        state.searchResults = state.searchResults.filter(
          (video) => video.id !== action.payload.savedId
        );
      }
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      videoApi.endpoints.searchVideos.matchPending,
      (state, { payload }) => {
        state.listFetching = true;
      }
    );
    builder.addMatcher(
      videoApi.endpoints.searchVideos.matchFulfilled,
      (state, { payload }) => {
        state.listFetching = false;
      }
    );
    builder.addMatcher(
      videoApi.endpoints.searchVideos.matchRejected,
      (state, { payload }) => {
        state.listFetching = false;
      }
    );
    builder.addMatcher(
      videoApi.endpoints.saveUserVideo.matchPending,
      (state, { payload }) => {
        state.savedId = "";
        state.saveFailId = "";
      }
    );
    builder.addMatcher(
      videoApi.endpoints.saveUserVideo.matchFulfilled,
      (state, { payload }) => {
        state.savedId = payload.id;
        state.saveFailId = "";
      }
    );
    builder.addMatcher(
      videoApi.endpoints.saveUserVideo.matchRejected,
      (state, { payload, meta, error }) => {
        state.saveFailId = meta.arg.originalArgs.id;
        state.savedId = "";
      }
    );
    builder.addMatcher(
      videoApi.endpoints.fetchUserVideos.matchFulfilled,
      (state, { payload }) => {
        state.savedVideos = payload;
      }
    );
    builder.addMatcher(
      videoApi.endpoints.deleteUserVideo.matchPending,
      (state, { payload }) => {
        state.deleteFailId = "";
      }
    );
    builder.addMatcher(
      videoApi.endpoints.deleteUserVideo.matchFulfilled,
      (state, { payload }) => {
        state.deleteFailId = "";
      }
    );
    builder.addMatcher(
      videoApi.endpoints.deleteUserVideo.matchRejected,
      (state, { payload, meta, error }) => {
        state.deleteFailId = meta.arg.originalArgs.id;
      }
    );
  },
});

export const { setVideoSliceData, resetVideoAlertPopup } =
  videoDataSlice.actions;
export const videoReducer = videoDataSlice.reducer;
