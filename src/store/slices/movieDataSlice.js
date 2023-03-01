import { createSlice } from "@reduxjs/toolkit";
import { movieApi } from "../apis/movieApi";
import uniqby from "lodash.uniqby";

const initialState = {
  listFetching: false,
  originalData: [],
  searchResults: [],
  savedMovies: [],
  savedId: "",
  saveFailId: "",
  deleteFailId: "",
  searchError: false,
  noMoviesFound: false,
};

const movieDataSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    resetMovieSliceData(state, action) {
      return {
        ...state,
        ...{
          listFetching: false,
          originalData: [],
          searchResults: [],
          searchError: false,
          noMoviesFound: false,
        },
      };
    },
    setMovieSliceData(state, action) {
      return { ...state, ...action.payload };
    },
    resetMovieAlertPopup(state, action) {
      if (action.payload.saveFailId) {
        state.saveFailId = "";
      } else if (action.payload.deleteFailId) {
        state.deleteFailId = "";
      } else if (action.payload.savedId) {
        state.savedId = "";
        state.searchResults = state.searchResults.filter(
          (movie) => movie.id !== action.payload.savedId
        );
      }
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      movieApi.endpoints.searchMovie.matchPending,
      (state, { payload }) => {
        state.listFetching = true;
        state.searchError = false;
      }
    );
    builder.addMatcher(
      movieApi.endpoints.searchMovie.matchFulfilled,
      (state, { payload }) => {}
    );
    builder.addMatcher(
      movieApi.endpoints.searchMovie.matchRejected,
      (state, { payload }) => {
        state.listFetching = false;
        state.searchError = true;
      }
    );
    builder.addMatcher(
      movieApi.endpoints.searchMovieDetails.matchPending,
      (state, { payload }) => {}
    );
    builder.addMatcher(
      movieApi.endpoints.searchMovieDetails.matchFulfilled,
      (state, { payload, meta }) => {
        let details = {
          id: payload.id,
          title: payload.title?.title,
          posterUrl: payload.title?.image?.url,
          runningTimeInMinutes: payload.title?.runningTimeInMinutes,
          genres: payload.genres?.join(", "),
          summary: payload.plotOutline?.text,
          rating: payload.ratings?.rating,
          certificate: payload.certificates?.US[0]?.certificate,
          releaseDate: payload.releaseDate,
          cast: meta.arg.originalArgs.movie.cast,
        };

        state.originalData.push(details);
        state.originalData = uniqby(state.originalData, "id");
        state.listFetching = false;
      }
    );
    builder.addMatcher(
      movieApi.endpoints.searchMovieDetails.matchRejected,
      (state, { payload }) => {
        state.listFetching = false;
        state.searchError = true;
      }
    );
    builder.addMatcher(
      movieApi.endpoints.saveUserMovie.matchPending,
      (state, { payload }) => {
        state.savedId = "";
        state.saveFailId = "";
      }
    );
    builder.addMatcher(
      movieApi.endpoints.saveUserMovie.matchFulfilled,
      (state, { payload }) => {
        state.savedId = payload.id;
        state.saveFailId = "";
      }
    );
    builder.addMatcher(
      movieApi.endpoints.saveUserMovie.matchRejected,
      (state, { payload, meta, error }) => {
        state.saveFailId = meta.arg.originalArgs.id;
        state.savedId = "";
      }
    );
    builder.addMatcher(
      movieApi.endpoints.fetchUserMovies.matchFulfilled,
      (state, { payload }) => {
        state.savedMovies = payload;
      }
    );
    builder.addMatcher(
      movieApi.endpoints.deleteUserMovie.matchPending,
      (state, { payload }) => {
        state.deleteFailId = "";
      }
    );
    builder.addMatcher(
      movieApi.endpoints.deleteUserMovie.matchFulfilled,
      (state, { payload }) => {
        state.deleteFailId = "";
      }
    );
    builder.addMatcher(
      movieApi.endpoints.deleteUserMovie.matchRejected,
      (state, { payload, meta, error }) => {
        state.deleteFailId = meta.arg.originalArgs.id;
      }
    );
  },
});

export const { setMovieSliceData, resetMovieAlertPopup, resetMovieSliceData } =
  movieDataSlice.actions;
export const movieReducer = movieDataSlice.reducer;
