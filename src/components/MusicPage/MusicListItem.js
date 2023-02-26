import React from "react";
import ExpandablePanel from "../ExpandablePanel";
import {
  BsFillBookmarkHeartFill,
  BsFillBookmarkDashFill,
  BsFillPlayCircleFill,
  BsFillStopCircleFill,
} from "react-icons/bs";
import { GiSaxophone } from "react-icons/gi";
import { usePreviewPlayer } from "../../hooks";

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
  const { playPreviewSong } = usePreviewPlayer(
    song,
    timerIds,
    setTimerIds,
    setPlay,
    setPreview,
    setPreviewName,
    setPreviewLink
  );
  const header = (
    <>
      <button className="mr-3" onClick={() => console.log("favorite clicked")}>
        {!bookmarked ? <BsFillBookmarkHeartFill /> : <BsFillBookmarkDashFill />}
      </button>
      {song.trackName}
    </>
  );

  return (
    <>
      <ExpandablePanel header={header}>
        <div className="text-xl max-[770px]:text-sm">
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
    </>
  );
}
export default MusicListItem;
