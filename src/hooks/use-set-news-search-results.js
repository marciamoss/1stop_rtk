import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewsSliceData } from "../store";
import uniqby from "lodash.uniqby";

function useSetNewsSearchResults(data) {
  const dispatch = useDispatch();
  const { savedNews } = useSelector((state) => {
    return {
      savedNews: state.newsData.savedNews,
    };
  });
  useEffect(() => {
    if (data?.results) {
      let searchResults = data?.results?.filter(
        (n) => n.title !== "" && n.short_url !== ""
      );
      dispatch(
        setNewsSliceData({
          searchResults: uniqby(searchResults, "uri"),
        })
      );
    }
  }, [data?.results, dispatch]);

  useEffect(() => {
    if (savedNews.length === 0 && data?.results) {
      let searchResults = data?.results?.filter(
        (n) => n.title !== "" && n.short_url !== ""
      );
      dispatch(
        setNewsSliceData({ searchResults: uniqby(searchResults, "uri") })
      );
    }
  }, [data?.results, savedNews, dispatch]);
}
export default useSetNewsSearchResults;
