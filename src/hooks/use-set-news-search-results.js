import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewsSliceData } from "../store";

function useSetNewsSearchResults(data) {
  const dispatch = useDispatch();
  const { savedNews } = useSelector((state) => {
    return {
      savedNews: state.newsData.savedNews,
    };
  });
  useEffect(() => {
    if (data?.results) {
      dispatch(setNewsSliceData({ searchResults: data?.results }));
    }
  }, [data?.results, dispatch]);

  useEffect(() => {
    if (savedNews.length === 0 && data?.results) {
      dispatch(setNewsSliceData({ searchResults: data?.results }));
    }
  }, [data?.results, savedNews, dispatch]);
}
export default useSetNewsSearchResults;
