import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MoviesList from "./MoviesList";
import Button from "../Button";
import { FaSearch } from "react-icons/fa";
import {
  useSearchMovieQuery,
  useFetchUserMoviesQuery,
  resetMovieSliceData,
} from "../../store";

const MoviesPage = ({ bookmarkedPage }) => {
  const dispatch = useDispatch();
  const [movieTitle, setMovieTitle] = useState("");
  const [showList, setShowList] = useState(false);

  const { listFetching } = useSelector((state) => state.movieData);
  const { authUserId } = useSelector((state) => state.authData);

  const handleClick = async () => {
    setShowList(true);
  };

  return (
    <div className="container max-[770px]:text-sm text-center mt-2 p-2">
      <h5 className="text-right">
        {!bookmarkedPage ? (
          <Link
            className="text-blue-900 italic font-bold max-[770px]:text-base text-lg"
            to="/movies/bookmarked"
          >
            Bookmarked
          </Link>
        ) : (
          <Link
            className="text-blue-900 italic font-bold max-[770px]:text-base text-lg"
            to="/movies"
          >
            Back to Search
          </Link>
        )}
      </h5>
      {bookmarkedPage && authUserId ? (
        <MoviesList
          queryParameter={authUserId}
          bookmarked={true}
          queryFn={useFetchUserMoviesQuery}
        />
      ) : (
        <>
          <div>
            <h2 className="max-[770px]:text-base text-lg font-bold mb-1">
              Find a movie
            </h2>
            <div className="flex justify-center">
              <form
                onSubmit={(event) => event.preventDefault()}
                className="relative w-3/4 max-[770px]:w-full m-2"
              >
                <input
                  type="text"
                  className="h-14 w-full pl-14 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                  placeholder="Movie Title (Required)"
                  value={movieTitle}
                  onChange={(event) => {
                    setMovieTitle(event.target.value);
                    setShowList(false);
                    dispatch(resetMovieSliceData());
                  }}
                />
                <div className="absolute top-2 left-1">
                  <Button
                    disabled={!movieTitle}
                    loading={listFetching}
                    onClick={handleClick}
                    className={`h-fit w-fit border-0 ${
                      movieTitle
                        ? "text-blue-900 hover:text-green-900"
                        : "text-slate-300"
                    } ${listFetching ? "text-green-900 text-2xl" : ""}`}
                  >
                    <FaSearch size={30} />
                  </Button>
                </div>
              </form>
            </div>
          </div>
          {showList ? (
            <MoviesList
              queryParameter={movieTitle}
              bookmarked={false}
              queryFn={useSearchMovieQuery}
            />
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default MoviesPage;
