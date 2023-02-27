import React, { useState } from "react";
import { useSelector } from "react-redux";
import ExpandablePanel from "../ExpandablePanel";
import ConfirmModal from "../ConfirmModal";
import {
  BsFillBookmarkHeartFill,
  BsFillBookmarkDashFill,
  BsFillPlayCircleFill,
  BsFillStopCircleFill,
} from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import { GiSaxophone } from "react-icons/gi";
import { useDeleteUserSongMutation } from "../../store";
import { usePreviewPlayer, useMusicAction } from "../../hooks";

function MusicListItem({
  song,
  bookmarked,
  play,
  setPlay,
  preview,
  setPreview,
  setPreviewName,
  setPreviewLink,
  timerIds,
  setTimerIds,
}) {
  const { authUserId, savedId, saveFailId, deleteFailId } = useSelector(
    (state) => {
      return {
        savedId: state.musicData.savedId,
        saveFailId: state.musicData.saveFailId,
        deleteFailId: state.musicData.deleteFailId,
        authUserId: state.authData.authUserId,
      };
    }
  );
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteUserSong] = useDeleteUserSongMutation();

  const { saveSong, previouslySaved } = useMusicAction(authUserId);

  const { playPreviewSong } = usePreviewPlayer(
    song,
    timerIds,
    setTimerIds,
    setPlay,
    setPreview,
    setPreviewName,
    setPreviewLink
  );

  const handleAddRemove = () => {
    if (!bookmarked) {
      saveSong(song);
    } else {
      setDeleteConfirm(true);
    }
  };
  const header = (
    <>
      <button className="mr-3" onClick={handleAddRemove}>
        {!bookmarked ? <BsFillBookmarkHeartFill /> : <BsFillBookmarkDashFill />}
      </button>
      {song.trackName}
    </>
  );

  return (
    <div className="text-base">
      {deleteConfirm ? (
        <ConfirmModal
          setDeleteConfirm={setDeleteConfirm}
          deleteFn={deleteUserSong}
          current={song}
          confirmMessage={`Delete Confirmation on "${song.trackName}"?`}
        />
      ) : (
        ""
      )}
      {savedId === song.trackId ||
      previouslySaved ||
      saveFailId === song.trackId ||
      deleteFailId === song.trackId ? (
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
                ? ` Previously Bookmarked: "${song.trackName}"`
                : `Bookmarked "${song.trackName}"`}
            </p>
          )}
        </div>
      ) : (
        ""
      )}
      <ExpandablePanel header={header}>
        <div className="text-base max-[770px]:text-sm">
          <div key={song.trackId} className="content flex py-2">
            {song.artworkUrl100 ? (
              <img
                className="inline h-20 w-20"
                src={song.artworkUrl100}
                alt="N/A"
              />
            ) : (
              <GiSaxophone className="inline h-20 w-20" />
            )}

            <div className="item-body px-2 ">
              <p>{song.trackName}</p>
              <p>
                <a
                  href={song.artistViewUrl}
                  target="blank"
                  className="italic text-blue-900"
                >
                  Artists: {song.artistName},
                </a>

                <a
                  href={song.trackViewUrl}
                  target="blank"
                  className="italic text-blue-900"
                >
                  &nbsp;&nbsp;Album: {song.collectionName}
                </a>
              </p>
              {!play ? (
                <div className="h-5">
                  <button
                    disabled={preview && song.previewUrl !== preview}
                    onClick={() => playPreviewSong(true)}
                  >
                    <div className="flex items-center text-green-900">
                      <span className="mr-1 text-sm">30 sec preview</span>
                      <BsFillPlayCircleFill />
                      <span className="ml-1 text-sm">click to start</span>
                    </div>
                  </button>
                </div>
              ) : preview && song.previewUrl === preview ? (
                <div className="h-5">
                  <button onClick={() => playPreviewSong(false, true)}>
                    <div className="flex items-center text-pink-900">
                      <span className="mr-1 text-sm">30 sec preview</span>
                      <BsFillStopCircleFill />
                      <span className="ml-1 text-sm">click to stop</span>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="h-5">
                  <button disabled={true}>
                    <div className="flex items-center bg-gray-300 text-slate-500 text-sm">
                      Stop the current to preview this one
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </ExpandablePanel>
    </div>
  );
}
export default MusicListItem;
