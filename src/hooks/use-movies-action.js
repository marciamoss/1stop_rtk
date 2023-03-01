import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setMovieSliceData,
  resetMovieAlertPopup,
  useSaveUserMovieMutation,
  useFetchUserMoviesQuery,
} from "../store";

function useMoviesAction(authUserId) {
  const dispatch = useDispatch();
  const [saveUserMovie] = useSaveUserMovieMutation();
  const [previouslySaved, setPreviouslySaved] = useState(false);
  useFetchUserMoviesQuery(authUserId);

  const { savedMovies, savedId, saveFailId, deleteFailId } = useSelector(
    (state) => {
      return {
        savedMovies: state.movieData.savedMovies,
        savedId: state.movieData.savedId,
        saveFailId: state.movieData.saveFailId,
        deleteFailId: state.movieData.deleteFailId,
      };
    }
  );
  const saveMovie = (movie) => {
    if (savedMovies.filter((s) => s.id === movie.id).length > 0) {
      setPreviouslySaved(true);
      dispatch(setMovieSliceData({ savedId: movie.id }));
    } else {
      saveUserMovie({ ...movie, ...{ userId: authUserId } });
    }
  };

  const resetAlert = useCallback(
    (id) =>
      setTimeout(() => {
        setPreviouslySaved(false);
        dispatch(resetMovieAlertPopup(id));
      }, 1500),
    [dispatch]
  );

  useEffect(() => {
    if (savedId) {
      resetAlert({ savedId });
    }
    if (saveFailId) {
      resetAlert({ saveFailId });
    }
    if (deleteFailId) {
      resetAlert({ deleteFailId });
    }
  }, [savedId, saveFailId, deleteFailId, dispatch, resetAlert]);

  return {
    saveMovie,
    previouslySaved,
  };
}

export default useMoviesAction;
