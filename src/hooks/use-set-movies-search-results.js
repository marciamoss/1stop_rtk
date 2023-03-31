import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovieSliceData } from "../store";
import uniqby from "lodash.uniqby";

function useSetMoviesSearchResults() {
  const dispatch = useDispatch();
  const { savedMovies, originalData } = useSelector((state) => state.movieData);

  useEffect(() => {
    if (originalData) {
      let searchResults = originalData;
      dispatch(
        setMovieSliceData({
          searchResults: uniqby(searchResults, "id"),
        })
      );
    }
  }, [originalData, dispatch]);

  useEffect(() => {
    if (savedMovies.length === 0 && originalData) {
      let searchResults = originalData;
      dispatch(
        setMovieSliceData({ searchResults: uniqby(searchResults, "id") })
      );
    }
  }, [originalData, savedMovies, dispatch]);
}
export default useSetMoviesSearchResults;
