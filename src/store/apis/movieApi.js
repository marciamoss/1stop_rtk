import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setMovieSliceData } from "../";
const keys = require("../../keys.js");

const movieApi = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({
    baseUrl: keys.mongo.api,
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      searchMovie: builder.query({
        queryFn: async ({ movieTitle }, { dispatch }) => {
          try {
            const movies = await fetch(`${keys.movie.url}?q=${movieTitle}`, {
              method: "GET",
              headers: keys.imdb,
            });
            const { results } = await movies.json();
            if (!results) {
              dispatch(
                setMovieSliceData({ listFetching: false, noMoviesFound: true })
              );
            }
            results
              ?.filter((s) => s.titleType === "movie")
              ?.slice(0, 4)
              .forEach(async (m) => {
                let cast = "";
                m?.principals?.forEach(
                  (p, index) =>
                    (cast = index === 0 ? p?.name : `${cast}, ${p?.name}`)
                );

                await dispatch(
                  movieApi.endpoints.searchMovieDetails.initiate({
                    movie: { cast, id: m.id },
                  })
                );
              });
          } catch (error) {
            dispatch(
              setMovieSliceData({ listFetching: false, searchError: true })
            );
          }
          return {};
        },
      }),
      searchMovieDetails: builder.query({
        query: ({ movie }) => {
          return {
            url: `${keys.movie.detailsUrl}?tconst=${movie.id.substring(
              7,
              movie.id.lastIndexOf("/")
            )}&currentCountry=US`,
            method: "GET",
            headers: keys.imdb,
          };
        },
      }),
      saveUserMovie: builder.mutation({
        invalidatesTags: (result, error, movie) => {
          return [{ type: "UsersMovies", id: movie.userId }];
        },
        query: (movie) => {
          return {
            url: "/api/movies/save",
            method: "POST",
            body: {
              movie,
            },
          };
        },
      }),
      fetchUserMovies: builder.query({
        providesTags: (result, error, user) => {
          let tags;
          if (result) {
            tags = result?.map((movie) => {
              return { type: "Movie", id: movie.id };
            });
            tags.push({ type: "UsersMovies", id: user });
          } else {
            tags = [];
          }
          return tags;
        },
        query: (user) => {
          return {
            url: `/api/movies/${user}`,
            method: "GET",
          };
        },
      }),
      deleteUserMovie: builder.mutation({
        invalidatesTags: (result, error, movie) => {
          return [{ type: "UsersMovies", id: movie.userId }];
        },
        query: (movie) => {
          return {
            url: `/api/movies/${movie._id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useSearchMovieQuery,
  useSearchMovieDetailsQuery,
  useSaveUserMovieMutation,
  useFetchUserMoviesQuery,
  useDeleteUserMovieMutation,
} = movieApi;
export { movieApi };
