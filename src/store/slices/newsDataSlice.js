import { createSlice } from "@reduxjs/toolkit";
import { newsApi } from "../apis/newsApi";

const initialState = {
  listFetching: false,
  searchResults: [],
  savedNews: [],
  savedId: "",
  saveFailId: "",
  deleteFailId: "",
};

const newsDataSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsSliceData(state, action) {
      return { ...state, ...action.payload };
    },
    resetNewsAlertPopup(state, action) {
      if (action.payload.saveFailId) {
        state.saveFailId = "";
      } else if (action.payload.deleteFailId) {
        state.deleteFailId = "";
      } else if (action.payload.savedId) {
        state.savedId = "";
        state.searchResults = state.searchResults.filter(
          (news) => news.uri !== action.payload.savedId
        );
      }
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      newsApi.endpoints.searchNews.matchPending,
      (state, { payload }) => {
        state.listFetching = true;
      }
    );
    builder.addMatcher(
      newsApi.endpoints.searchNews.matchFulfilled,
      (state, { payload }) => {
        state.listFetching = false;
      }
    );
    builder.addMatcher(
      newsApi.endpoints.searchNews.matchRejected,
      (state, { payload }) => {
        state.listFetching = false;
      }
    );
    builder.addMatcher(
      newsApi.endpoints.saveUserArticle.matchPending,
      (state, { payload }) => {
        state.savedId = "";
        state.saveFailId = "";
      }
    );
    builder.addMatcher(
      newsApi.endpoints.saveUserArticle.matchFulfilled,
      (state, { payload }) => {
        state.savedId = payload.uri;
        state.saveFailId = "";
      }
    );
    builder.addMatcher(
      newsApi.endpoints.saveUserArticle.matchRejected,
      (state, { payload, meta, error }) => {
        state.saveFailId = meta.arg.originalArgs.uri;
        state.savedId = "";
      }
    );
    builder.addMatcher(
      newsApi.endpoints.fetchUserArticles.matchFulfilled,
      (state, { payload }) => {
        state.savedNews = payload;
      }
    );
    builder.addMatcher(
      newsApi.endpoints.deleteUserArticle.matchPending,
      (state, { payload }) => {
        state.deleteFailId = "";
      }
    );
    builder.addMatcher(
      newsApi.endpoints.deleteUserArticle.matchFulfilled,
      (state, { payload }) => {
        state.deleteFailId = "";
      }
    );
    builder.addMatcher(
      newsApi.endpoints.deleteUserArticle.matchRejected,
      (state, { payload, meta, error }) => {
        state.deleteFailId = meta.arg.originalArgs.uri;
      }
    );
  },
});

export const { setNewsSliceData, resetNewsAlertPopup } = newsDataSlice.actions;
export const newsReducer = newsDataSlice.reducer;
