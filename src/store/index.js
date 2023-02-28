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
  previewPlayerDataReducer,
  setPreviewPlayerSliceData,
} from "./slices/previewPlayerDataSlice";

import { authApi } from "./apis/authApi";
import { userApi } from "./apis/userApi";
import { musicApi } from "./apis/musicApi";
import { newsApi } from "./apis/newsApi";
import { previewPlayerApi } from "./apis/previewPlayerApi";

export const store = configureStore({
  reducer: {
    authData: authDataReducer,
    userData: userDataReducer,
    musicData: songReducer,
    newsData: newsReducer,
    previewPlayerData: previewPlayerDataReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [musicApi.reducerPath]: musicApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [previewPlayerApi.reducerPath]: previewPlayerApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(musicApi.middleware)
      .concat(newsApi.middleware)
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
  useStartPlayerMutation,
  useStopPlayerMutation,
} from "./apis/previewPlayerApi";
