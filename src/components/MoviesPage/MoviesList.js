import React from "react";
import { useSelector } from "react-redux";
import Skeleton from "../Skeleton";
import MoviesListItem from "./MoviesListItem";
import { useSetMoviesSearchResults } from "../../hooks";

function MoviesList({ queryParameter, bookmarked, queryFn }) {
  let queryObject = !bookmarked
    ? { movieTitle: queryParameter }
    : queryParameter;

  const { data, isFetching, error } = queryFn(queryObject);
  useSetMoviesSearchResults();
  const {
    originalData,
    listFetching,
    searchResults,
    searchError,
    noMoviesFound,
  } = useSelector((state) => {
    return {
      originalData: state.movieData.originalData,
      searchResults: state.movieData.searchResults,
      listFetching: state.movieData.listFetching,
      searchError: state.movieData.searchError,
      noMoviesFound: state.movieData.noMoviesFound,
    };
  });
  let content;
  if ((!bookmarked && listFetching) || (isFetching && bookmarked)) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (searchResults.length === 0 && originalData.length > 0) {
    content = (
      <div className="text-center mt-28 text-green-800 font-extrabold text-2xl">
        All the movies for this title have been saved, Search for a new movie
      </div>
    );
  } else if ((bookmarked && error) || (!bookmarked && searchError)) {
    content = (
      <div className="m-2 container text-red-600 font-extrabold text-xl">
        Error fetching data...
      </div>
    );
  } else {
    const contentData = !bookmarked ? searchResults : data;
    content = contentData?.map((movie) => {
      return (
        <MoviesListItem key={movie.id} movie={movie} bookmarked={bookmarked} />
      );
    });
  }

  return (
    <div className="mt-1 mb-5">
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 container font-extrabold max-[770px]:text-sm text-base">
          {!bookmarked && searchResults.length > 0
            ? `List of Movies for "${queryParameter.toUpperCase()}"`
            : ""}
          {bookmarked && data?.length > 0 ? "Your Movies" : ""}
        </h1>
      </div>
      <h1 className="m-2 container font-extrabold text-xl text-red-900">
        {noMoviesFound && !bookmarked && !listFetching ? "No Movies Found" : ""}
        {!error && bookmarked && !data?.length && !isFetching
          ? "You have not saved any movies yet."
          : ""}
      </h1>
      {content}
    </div>
  );
}

export default MoviesList;
