import React, { useState } from "react";
import { useSelector } from "react-redux";
import ExpandablePanel from "../ExpandablePanel";
import ConfirmModal from "../ConfirmModal";
import {
  BsFillBookmarkHeartFill,
  BsFillBookmarkDashFill,
} from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import { BiNews } from "react-icons/bi";
import { useDeleteUserArticleMutation } from "../../store";
import { useNewsAction, useFormatDate } from "../../hooks";

function NewsListItem({ news, bookmarked }) {
  const { authUserId, savedId, saveFailId, deleteFailId } = useSelector(
    (state) => {
      return {
        savedId: state.newsData.savedId,
        saveFailId: state.newsData.saveFailId,
        deleteFailId: state.newsData.deleteFailId,
        authUserId: state.authData.authUserId,
      };
    }
  );
  const { rDate } = useFormatDate(news.published_date);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteUserArticle] = useDeleteUserArticleMutation();

  const { saveNews, previouslySaved } = useNewsAction(authUserId);

  const handleAddRemove = () => {
    if (!bookmarked) {
      saveNews(news);
    } else {
      setDeleteConfirm(true);
    }
  };
  const header = (
    <>
      <button className="mr-3" onClick={handleAddRemove}>
        {!bookmarked ? <BsFillBookmarkHeartFill /> : <BsFillBookmarkDashFill />}
      </button>
      {news.title}, {news.byline}, {rDate}
    </>
  );

  return (
    <div className="text-base">
      {deleteConfirm ? (
        <ConfirmModal
          setDeleteConfirm={setDeleteConfirm}
          deleteFn={deleteUserArticle}
          current={news}
          confirmMessage={`Delete Confirmation on "${news.title}"?`}
        />
      ) : (
        ""
      )}
      {savedId === news.uri ||
      previouslySaved ||
      saveFailId === news.uri ||
      deleteFailId === news.uri ? (
        <div
          className={`flex items-center ${
            saveFailId || deleteFailId ? "bg-red-500" : "bg-green-500"
          } text-white text-lg font-bold px-4 py-3" role="alert"`}
        >
          <FaInfoCircle />
          {saveFailId || deleteFailId ? (
            <p className="ml-1">Action Failed At This Time!</p>
          ) : (
            <p className="ml-1">
              {previouslySaved
                ? ` Previously Bookmarked: "${news.title}"`
                : `Bookmarked "${news.title}"`}
            </p>
          )}
        </div>
      ) : (
        ""
      )}
      <ExpandablePanel header={header}>
        <div className="text-base max-[770px]:text-sm">
          <div key={news.uri} className="content flex py-2">
            {news.multimedia ? (
              <a
                href={news.short_url}
                target="blank"
                className="talic text-blue-600"
              >
                <img
                  className="inline h-20 w-20"
                  src={news.multimedia[0].url}
                  alt="N/A"
                />
              </a>
            ) : (
              <a
                href={news.short_url}
                target="blank"
                className="italic text-blue-600"
              >
                <BiNews className="inline h-20 w-20" />
              </a>
            )}

            <div className="item-body px-2 ">
              <p>
                {news.abstract}
                <a
                  href={news.short_url}
                  target="blank"
                  className="italic text-blue-600 visited:text-purple-600"
                >
                  <br />
                  Click here to read the full article
                </a>
              </p>
            </div>
          </div>
        </div>
      </ExpandablePanel>
    </div>
  );
}
export default NewsListItem;
