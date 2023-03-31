import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVideoSliceData } from "../store";
import uniqby from "lodash.uniqby";

function useSetVideosSearchResults(data) {
  const dispatch = useDispatch();
  const { savedVideos } = useSelector((state) => state.videoData);
  useEffect(() => {
    if (data?.items) {
      let searchResults = data?.items;
      dispatch(
        setVideoSliceData({
          searchResults: uniqby(searchResults, "id"),
        })
      );
    }
  }, [data?.items, dispatch]);

  useEffect(() => {
    if (savedVideos.length === 0 && data?.items) {
      let searchResults = data?.items;
      dispatch(
        setVideoSliceData({ searchResults: uniqby(searchResults, "id") })
      );
    }
  }, [data?.items, savedVideos, dispatch]);
}
export default useSetVideosSearchResults;
