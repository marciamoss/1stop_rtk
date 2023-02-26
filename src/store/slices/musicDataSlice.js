import { createSlice } from "@reduxjs/toolkit";
import { musicApi } from "../apis/musicApi";

const initialState = {
  songTitle: "",
  showList: false,
  listFetching: false,
  searchResults: [],
  savedSongs: [],
  savedId: "",
  saveFailId: "",
  deleteFailId: "",
};

const musicDataSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSongSliceData(state, action) {
      return { ...state, ...action.payload };
    },
    resetAlertPopup(state, action) {
      if (action.payload.saveFailId) {
        state.saveFailId = "";
      } else if (action.payload.deleteFailId) {
        state.deleteFailId = "";
      } else if (action.payload.savedId) {
        state.savedId = "";
        state.searchResults = state.searchResults.filter(
          (song) => song.trackId !== action.payload.savedId
        );
      }
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      musicApi.endpoints.searchMusic.matchPending,
      (state, { payload }) => {
        state.listFetching = true;
      }
    );
    builder.addMatcher(
      musicApi.endpoints.searchMusic.matchFulfilled,
      (state, { payload }) => {
        state.listFetching = false;
      }
    );
    builder.addMatcher(
      musicApi.endpoints.searchMusic.matchRejected,
      (state, { payload }) => {
        state.listFetching = false;
      }
    );
    builder.addMatcher(
      musicApi.endpoints.saveUserSong.matchPending,
      (state, { payload }) => {
        state.savedId = "";
        state.saveFailId = "";
      }
    );
    builder.addMatcher(
      musicApi.endpoints.saveUserSong.matchFulfilled,
      (state, { payload }) => {
        state.savedId = payload.trackId;
        state.saveFailId = "";
      }
    );
    builder.addMatcher(
      musicApi.endpoints.saveUserSong.matchRejected,
      (state, { payload, meta, error }) => {
        state.saveFailId = meta.arg.originalArgs.trackId;
        state.savedId = "";
      }
    );
    builder.addMatcher(
      musicApi.endpoints.fetchUserSongs.matchFulfilled,
      (state, { payload }) => {
        state.savedSongs = payload;
      }
    );
    builder.addMatcher(
      musicApi.endpoints.deleteUserSong.matchPending,
      (state, { payload }) => {
        state.deleteFailId = "";
      }
    );
    builder.addMatcher(
      musicApi.endpoints.deleteUserSong.matchFulfilled,
      (state, { payload }) => {
        state.deleteFailId = "";
      }
    );
    builder.addMatcher(
      musicApi.endpoints.deleteUserSong.matchRejected,
      (state, { payload, meta, error }) => {
        state.deleteFailId = meta.arg.originalArgs.trackId;
      }
    );
  },
});

export const { setSongSliceData, resetAlertPopup } = musicDataSlice.actions;
export const songReducer = musicDataSlice.reducer;
