import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setNewsSliceData,
  resetNewsAlertPopup,
  useSaveUserArticleMutation,
  useFetchUserArticlesQuery,
} from "../store";

function useNewsAction(authUserId) {
  const dispatch = useDispatch();
  const [saveUserArticle] = useSaveUserArticleMutation();
  const [previouslySaved, setPreviouslySaved] = useState(false);
  useFetchUserArticlesQuery(authUserId);

  const { savedNews, savedId, saveFailId, deleteFailId } = useSelector(
    (state) => state.newsData
  );
  const saveNews = (news) => {
    if (savedNews.filter((s) => s.uri === news.uri).length > 0) {
      setPreviouslySaved(true);
      dispatch(setNewsSliceData({ savedId: news.uri }));
    } else {
      saveUserArticle({ ...news, ...{ userId: authUserId } });
    }
  };

  const resetAlert = useCallback(
    (id) =>
      setTimeout(() => {
        setPreviouslySaved(false);
        dispatch(resetNewsAlertPopup(id));
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
    saveNews,
    previouslySaved,
  };
}

export default useNewsAction;
