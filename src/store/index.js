import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  authDataReducer,
  authDataInfo,
  validRoute,
} from "./slices/authDataSlice";
import { userDataReducer } from "./slices/userDataSlice";
import { songReducer, setSongSliceData } from "./slices/musicDataSlice";

import { authApi } from "./apis/authApi";
import { userApi } from "./apis/userApi";
import { musicApi } from "./apis/musicApi";

export const store = configureStore({
  reducer: {
    authData: authDataReducer,
    userData: userDataReducer,
    musicData: songReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [musicApi.reducerPath]: musicApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(musicApi.middleware);
  },
});
setupListeners(store.dispatch);

export { authDataInfo, validRoute, setSongSliceData };

export { useLogInMutation, useLogOutMutation } from "./apis/authApi";
export { useFetchUserQuery, useAddUserMutation } from "./apis/userApi";
export { useSearchMusicQuery } from "./apis/musicApi";
