import { createSlice } from "@reduxjs/toolkit";
import { musicApi } from "../apis/musicApi";

const initialState = {
  isLoading: false,
  loadingError: false,
  loadingSavedSongsError: false,
  songTitle: "",
  songsList: [],
  noSongsFound: false,
  savedSongs: [],
  savedId: "",
  actionFailedId: "",
};
const musicDataSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSongSliceData(state, action) {
      return { ...state, ...action.payload };
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
  },
});

export const { setSongSliceData } = musicDataSlice.actions;
export const songReducer = musicDataSlice.reducer;
