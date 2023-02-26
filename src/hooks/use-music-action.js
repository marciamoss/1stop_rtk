import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSongSliceData,
  resetAlertPopup,
  useSaveUserSongMutation,
  useFetchUserSongsQuery,
} from "../store";

function useMusicAction(authUserId) {
  const dispatch = useDispatch();
  const [saveUserSong] = useSaveUserSongMutation();
  const [previouslySaved, setPreviouslySaved] = useState(false);
  useFetchUserSongsQuery(authUserId);

  const { savedSongs, savedId, saveFailId, deleteFailId } = useSelector(
    (state) => {
      return {
        savedSongs: state.musicData.savedSongs,
        savedId: state.musicData.savedId,
        saveFailId: state.musicData.saveFailId,
        deleteFailId: state.musicData.deleteFailId,
      };
    }
  );
  const saveSong = (song) => {
    if (savedSongs.filter((s) => s.trackId === song.trackId).length > 0) {
      setPreviouslySaved(true);
      dispatch(setSongSliceData({ savedId: song.trackId }));
    } else {
      saveUserSong({ ...song, ...{ userId: authUserId } });
    }
  };

  const resetAlert = useCallback(
    (id) =>
      setTimeout(() => {
        setPreviouslySaved(false);
        dispatch(resetAlertPopup(id));
      }, 0),
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
    saveSong,
    previouslySaved,
  };
}

export default useMusicAction;
