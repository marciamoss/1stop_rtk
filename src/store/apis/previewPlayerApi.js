import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const initialState = {
  play: false,
  preview: null,
  previewName: null,
  previewLink: null,
  timerIds: null,
};
const previewPlayerApi = createApi({
  reducerPath: "previewPlayer",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (builder) => ({
    startPlayer: builder.mutation({
      queryFn: async ({ song, setPreviewPlayerSliceData }, { dispatch }) => {
        if (window.Amplitude) {
          window.Amplitude.playNow({
            url: `${song.previewUrl}`,
          });
          const timerIds = setTimeout(() => {
            dispatch(setPreviewPlayerSliceData(initialState));
          }, 30000);
          dispatch(
            setPreviewPlayerSliceData({
              play: true,
              preview: song.previewUrl,
              previewName: song.trackName,
              previewLink: song.trackViewUrl,
              timerIds,
            })
          );
        }
        return {};
      },
    }),
    stopPlayer: builder.mutation({
      queryFn: async (
        { setPreviewPlayerSliceData },
        { dispatch, getState }
      ) => {
        clearTimeout(getState().previewPlayerData.timerIds);
        window.Amplitude.stop();
        dispatch(setPreviewPlayerSliceData(initialState));
        return {};
      },
    }),
  }),
});
export const { useStartPlayerMutation, useStopPlayerMutation } =
  previewPlayerApi;
export { previewPlayerApi };
