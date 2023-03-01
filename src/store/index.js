import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  authDataReducer,
  authDataInfo,
  validRoute,
} from "./slices/authDataSlice";
import { userDataReducer } from "./slices/userDataSlice";
import {
  songReducer,
  setSongSliceData,
  resetMusicAlertPopup,
} from "./slices/musicDataSlice";
import {
  newsReducer,
  setNewsSliceData,
  resetNewsAlertPopup,
} from "./slices/newsDataSlice";
import {
  movieReducer,
  setMovieSliceData,
  resetMovieSliceData,
  resetMovieAlertPopup,
} from "./slices/movieDataSlice";
import {
  previewPlayerDataReducer,
  setPreviewPlayerSliceData,
} from "./slices/previewPlayerDataSlice";

import { authApi } from "./apis/authApi";
import { userApi } from "./apis/userApi";
import { musicApi } from "./apis/musicApi";
import { newsApi } from "./apis/newsApi";
import { movieApi } from "./apis/movieApi";
import { previewPlayerApi } from "./apis/previewPlayerApi";

export const store = configureStore({
  reducer: {
    authData: authDataReducer,
    userData: userDataReducer,
    musicData: songReducer,
    newsData: newsReducer,
    movieData: movieReducer,
    previewPlayerData: previewPlayerDataReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [musicApi.reducerPath]: musicApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [previewPlayerApi.reducerPath]: previewPlayerApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(musicApi.middleware)
      .concat(newsApi.middleware)
      .concat(movieApi.middleware)
      .concat(previewPlayerApi.middleware);
  },
});
setupListeners(store.dispatch);

export {
  authDataInfo,
  validRoute,
  setSongSliceData,
  resetMusicAlertPopup,
  setNewsSliceData,
  resetNewsAlertPopup,
  setMovieSliceData,
  resetMovieSliceData,
  resetMovieAlertPopup,
  setPreviewPlayerSliceData,
};

export { useLogInMutation, useLogOutMutation } from "./apis/authApi";
export { useFetchUserQuery, useAddUserMutation } from "./apis/userApi";
export {
  useSearchMusicQuery,
  useSaveUserSongMutation,
  useFetchUserSongsQuery,
  useDeleteUserSongMutation,
} from "./apis/musicApi";
export {
  useSearchNewsQuery,
  useSaveUserArticleMutation,
  useFetchUserArticlesQuery,
  useDeleteUserArticleMutation,
} from "./apis/newsApi";
export {
  useSearchMovieQuery,
  useSearchMovieDetailsQuery,
  useSaveUserMovieMutation,
  useFetchUserMoviesQuery,
  useDeleteUserMovieMutation,
} from "./apis/movieApi";
export {
  useStartPlayerMutation,
  useStopPlayerMutation,
} from "./apis/previewPlayerApi";
