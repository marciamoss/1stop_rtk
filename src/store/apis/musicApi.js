import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const keys = require("../../keys.js");

const musicApi = createApi({
  reducerPath: "music",
  baseQuery: fetchBaseQuery({
    baseUrl: keys.mongo.api,
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      searchMusic: builder.query({
        query: ({ songTitle }) => {
          const songName = songTitle.split(" ").join("+");
          return {
            url: `https://itunes.apple.com/search?term=${songName}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useSearchMusicQuery } = musicApi;
export { musicApi };
