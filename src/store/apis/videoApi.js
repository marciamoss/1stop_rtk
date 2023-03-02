import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const keys = require("../../keys.js");

const videoApi = createApi({
  reducerPath: "video",
  baseQuery: fetchBaseQuery({
    baseUrl: keys.mongo.api,
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      searchVideos: builder.query({
        query: ({ videoTitle }) => {
          return {
            url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${videoTitle}&type=video&videoEmbeddable=true&key=${keys.video.apiKey}`,
            method: "GET",
          };
        },
        transformResponse: (response) => {
          for (const id in response.items) {
            const video = response.items[id];
            response.items[id] = {
              id: video.id.videoId,
              title: video.snippet.title,
              description: video.snippet.description,
            };
          }
          return response;
        },
      }),
      saveUserVideo: builder.mutation({
        invalidatesTags: (result, error, video) => {
          return [{ type: "UsersVideos", id: video.userId }];
        },
        query: (video) => {
          return {
            url: "/api/videos/save",
            method: "POST",
            body: {
              video,
            },
          };
        },
      }),
      fetchUserVideos: builder.query({
        providesTags: (result, error, user) => {
          let tags;
          if (result) {
            tags = result?.map((video) => {
              return { type: "Video", id: video.id };
            });
            tags.push({ type: "UsersVideos", id: user });
          } else {
            tags = [];
          }
          return tags;
        },
        query: (user) => {
          return {
            url: `/api/videos/${user}`,
            method: "GET",
          };
        },
      }),
      deleteUserVideo: builder.mutation({
        invalidatesTags: (result, error, video) => {
          return [{ type: "UsersVideos", id: video.userId }];
        },
        query: (video) => {
          return {
            url: `/api/videos/${video._id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useSearchVideosQuery,
  useSaveUserVideoMutation,
  useFetchUserVideosQuery,
  useDeleteUserVideoMutation,
} = videoApi;
export { videoApi };
