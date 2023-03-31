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
import {
  useDeleteUserSongMutation,
  setPreviewPlayerSliceData,
  useStartPlayerMutation,
  useStopPlayerMutation,
} from "../../store";
import { useMusicAction } from "../../hooks";

function MusicListItem({ song, bookmarked }) {
  const { authUserId } = useSelector((state) => state.authData);
  const { savedId, saveFailId, deleteFailId } = useSelector(
    (state) => state.musicData
  );
  const { previewPlayerData } = useSelector((state) => state);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteUserSong] = useDeleteUserSongMutation();
  const [startPlayer] = useStartPlayerMutation();
  const [stopPlayer] = useStopPlayerMutation();

  const [saveSong, previouslySaved] = useMusicAction(authUserId);

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
              <a
                href={song.trackViewUrl}
                target="blank"
                className="italic text-blue-600"
              >
                <img
                  className="inline h-20 w-20"
                  src={song.artworkUrl100}
                  alt="N/A"
                />
              </a>
            ) : (
              <a
                href={song.trackViewUrl}
                target="blank"
                className="italic text-blue-600"
              >
                <GiSaxophone className="inline h-20 w-20" />
              </a>
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
              {previewPlayerData.preview &&
              song.previewUrl === previewPlayerData.preview ? (
                <div className="h-5">
                  <button
                    onClick={() => stopPlayer({ setPreviewPlayerSliceData })}
                  >
                    <div className="flex items-center text-pink-900">
                      <span className="mr-1 text-sm">30 sec preview</span>
                      <BsFillStopCircleFill />
                      <span className="ml-1 text-sm">click to stop</span>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="h-5">
                  <button
                    onClick={() => {
                      startPlayer({ song, setPreviewPlayerSliceData });
                    }}
                  >
                    <div className="flex items-center text-green-900">
                      <span className="mr-1 text-sm">30 sec preview</span>
                      <BsFillPlayCircleFill />
                      <span className="ml-1 text-sm">click to start</span>
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
