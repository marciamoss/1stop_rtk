import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSongSliceData } from "../store";
import uniqby from "lodash.uniqby";

function useSetSearchResults(data) {
  const dispatch = useDispatch();
  const { savedSongs } = useSelector((state) => {
    return {
      savedSongs: state.musicData.savedSongs,
    };
  });
  useEffect(() => {
    if (data?.results) {
      let searchResults = data?.results?.filter((s) => s.kind === "song");
      dispatch(
        setSongSliceData({
          searchResults: uniqby(searchResults, "trackId"),
        })
      );
    }
  }, [data?.results, dispatch]);

  useEffect(() => {
    if (savedSongs.length === 0 && data?.results) {
      let searchResults = data?.results?.filter((s) => s.kind === "song");
      dispatch(
        setSongSliceData({ searchResults: uniqby(searchResults, "trackId") })
      );
    }
  }, [data?.results, savedSongs, dispatch]);
}
export default useSetSearchResults;
