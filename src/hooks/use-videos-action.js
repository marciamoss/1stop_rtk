import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setVideoSliceData,
  resetVideoAlertPopup,
  useSaveUserVideoMutation,
  useFetchUserVideosQuery,
} from "../store";

function useVideosAction(authUserId) {
  const dispatch = useDispatch();
  const [saveUserVideo] = useSaveUserVideoMutation();
  const [previouslySaved, setPreviouslySaved] = useState(false);
  useFetchUserVideosQuery(authUserId);

  const { savedVideos, savedId, saveFailId, deleteFailId } = useSelector(
    (state) => {
      return {
        savedVideos: state.videoData.savedVideos,
        savedId: state.videoData.savedId,
        saveFailId: state.videoData.saveFailId,
        deleteFailId: state.videoData.deleteFailId,
      };
    }
  );
  const saveVideo = (video) => {
    if (savedVideos.filter((s) => s.id === video.id).length > 0) {
      setPreviouslySaved(true);
      dispatch(setVideoSliceData({ savedId: video.id }));
    } else {
      saveUserVideo({ ...video, ...{ userId: authUserId } });
    }
  };

  const resetAlert = useCallback(
    (id) =>
      setTimeout(() => {
        setPreviouslySaved(false);
        dispatch(resetVideoAlertPopup(id));
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
    saveVideo,
    previouslySaved,
  };
}

export default useVideosAction;
