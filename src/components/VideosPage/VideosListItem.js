import React, { useState } from "react";
import { useSelector } from "react-redux";
import ExpandablePanel from "../ExpandablePanel";
import ConfirmModal from "../ConfirmModal";
import {
  BsFillBookmarkHeartFill,
  BsFillBookmarkDashFill,
} from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import { useDeleteUserVideoMutation } from "../../store";
import { useVideosAction } from "../../hooks";

function VideosListItem({ video, bookmarked }) {
  const { authUserId, savedId, saveFailId, deleteFailId } = useSelector(
    (state) => {
      return {
        savedId: state.videoData.savedId,
        saveFailId: state.videoData.saveFailId,
        deleteFailId: state.videoData.deleteFailId,
        authUserId: state.authData.authUserId,
      };
    }
  );
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteUserVideo] = useDeleteUserVideoMutation();

  const { saveVideo, previouslySaved } = useVideosAction(authUserId);

  const handleAddRemove = () => {
    if (!bookmarked) {
      saveVideo(video);
    } else {
      setDeleteConfirm(true);
    }
  };
  const header = (
    <>
      <button className="mr-3" onClick={handleAddRemove}>
        {!bookmarked ? <BsFillBookmarkHeartFill /> : <BsFillBookmarkDashFill />}
      </button>
      {video.title}
    </>
  );

  return (
    <div className="text-base">
      {deleteConfirm ? (
        <ConfirmModal
          setDeleteConfirm={setDeleteConfirm}
          deleteFn={deleteUserVideo}
          current={video}
          confirmMessage={`Delete Confirmation on "${video.title}"?`}
        />
      ) : (
        ""
      )}
      {savedId === video.id ||
      previouslySaved ||
      saveFailId === video.id ||
      deleteFailId === video.id ? (
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
                ? ` Previously Bookmarked: "${video.title}"`
                : `Bookmarked "${video.title}"`}
            </p>
          )}
        </div>
      ) : (
        ""
      )}
      <ExpandablePanel header={header}>
        <section className="max-w-full mx-auto">
          <iframe
            key={video.id}
            className="w-full sm:aspect-[4/3]"
            width="760"
            height="415"
            src={`https://www.youtube-nocookie.com/embed/${video.id}`}
            title="YouTube video player"
            allowFullScreen
          ></iframe>
        </section>
        {/* <div className="text-base max-[770px]:text-sm">
          <div key={video.id} className="content flex py-2">
            {video.artworkUrl100 ? (
              <a
                href={video.trackViewUrl}
                target="blank"
                className="italic text-blue-600"
              >
                <img
                  className="inline h-20 w-20"
                  src={video.artworkUrl100}
                  alt="N/A"
                />
              </a>
            ) : (
              <a
                href={video.trackViewUrl}
                target="blank"
                className="italic text-blue-600"
              >
                <GiSaxophone className="inline h-20 w-20" />
              </a>
            )}

            <div className="item-body px-2 ">
              <p>{video.title}</p>
              <p>
                <a
                  href={video.artistViewUrl}
                  target="blank"
                  className="italic text-blue-900"
                >
                  Artists: {video.artistName},
                </a>

                <a
                  href={video.trackViewUrl}
                  target="blank"
                  className="italic text-blue-900"
                >
                  &nbsp;&nbsp;Album: {video.collectionName}
                </a>
              </p>
            </div>
          </div>
        </div> */}
      </ExpandablePanel>
    </div>
  );
}
export default VideosListItem;
