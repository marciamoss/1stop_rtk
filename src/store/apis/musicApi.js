import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import uniqby from "lodash.uniqby";
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
            url: `${keys.music.url}/search?term=${songName}`,
            method: "GET",
          };
        },
        transformResponse: (response) => {
          response.results = uniqby(
            response.results?.filter((s) => s.kind === "song"),
            "trackId"
          );
          return response;
        },
      }),
      saveUserSong: builder.mutation({
        invalidatesTags: (result, error, song) => {
          return [{ type: "UsersSongs", id: song.userId }];
        },
        query: (song) => {
          return {
            url: "/api/music/save",
            method: "POST",
            body: {
              song,
            },
          };
        },
      }),
      fetchUserSongs: builder.query({
        providesTags: (result, error, user) => {
          let tags;
          if (result) {
            tags = result?.map((song) => {
              return { type: "Song", id: song.trackId };
            });
            tags.push({ type: "UsersSongs", id: user });
          } else {
            tags = [];
          }
          return tags;
        },
        query: (user) => {
          return {
            url: `/api/music/${user}`,
            method: "GET",
          };
        },
      }),
      deleteUserSong: builder.mutation({
        invalidatesTags: (result, error, song) => {
          return [{ type: "UsersSongs", id: song.userId }];
        },
        query: (song) => {
          return {
            url: `/api/music/${song._id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useSearchMusicQuery,
  useSaveUserSongMutation,
  useFetchUserSongsQuery,
  useDeleteUserSongMutation,
} = musicApi;
export { musicApi };
