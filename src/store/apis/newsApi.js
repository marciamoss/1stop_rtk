import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import uniqby from "lodash.uniqby";
const keys = require("../../keys.js");

const newsApi = createApi({
  reducerPath: "news",
  baseQuery: fetchBaseQuery({
    baseUrl: keys.mongo.api,
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      searchNews: builder.query({
        query: ({ section }) => {
          return {
            url: `https://api.nytimes.com/svc/topstories/v2/${section
              .toLowerCase()
              .replace(/\s+/g, "")}.json?api-key=${keys.nyt.apiKey}`,
            method: "GET",
          };
        },
        transformResponse: (response) => {
          response.results = uniqby(
            response.results?.filter((n) => n.title !== "" && n.url !== ""),
            "uri"
          );
          return response;
        },
      }),
      saveUserArticle: builder.mutation({
        invalidatesTags: (result, error, news) => {
          return [{ type: "UsersArticles", id: news.userId }];
        },
        query: (news) => {
          return {
            url: "/api/news/save",
            method: "POST",
            body: {
              news,
            },
          };
        },
      }),
      fetchUserArticles: builder.query({
        providesTags: (result, error, user) => {
          let tags;
          if (result) {
            tags = result?.map((news) => {
              return { type: "Article", id: news.uri };
            });
            tags.push({ type: "UsersArticles", id: user });
          } else {
            tags = [];
          }
          return tags;
        },
        query: (user) => {
          return {
            url: `/api/news/${user}`,
            method: "GET",
          };
        },
      }),
      deleteUserArticle: builder.mutation({
        invalidatesTags: (result, error, news) => {
          return [{ type: "UsersArticles", id: news.userId }];
        },
        query: (news) => {
          return {
            url: `/api/news/${news._id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useSearchNewsQuery,
  useSaveUserArticleMutation,
  useFetchUserArticlesQuery,
  useDeleteUserArticleMutation,
} = newsApi;
export { newsApi };
