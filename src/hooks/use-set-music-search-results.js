import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSongSliceData } from "../store";

function useSetMusicSearchResults(data) {
  const dispatch = useDispatch();
  const { savedSongs } = useSelector((state) => state.musicData);
  useEffect(() => {
    if (data?.results) {
      let searchResults = data?.results;
      dispatch(setSongSliceData({ searchResults }));
    }
  }, [data?.results, dispatch]);

  useEffect(() => {
    if (savedSongs.length === 0 && data?.results) {
      let searchResults = data.results;
      dispatch(setSongSliceData({ searchResults }));
    }
  }, [data?.results, savedSongs, dispatch]);
}
export default useSetMusicSearchResults;
