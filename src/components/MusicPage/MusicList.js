import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Skeleton from "../Skeleton";
import { useSearchMusicQuery } from "../../store";
import MusicListItem from "./MusicListItem";
import { BsFillStopCircleFill } from "react-icons/bs";

function MusicList({ songTitle, bookmarked }) {
  const { data, error, isFetching } = useSearchMusicQuery({ songTitle });
  const location = useLocation();
  const [play, setPlay] = useState(false);
  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState(null);
  const [previewLink, setPreviewLink] = useState(null);
  const [timerIds, setTimerIds] = useState([]);

  let content;
  if (isFetching) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (error && location.pathname === "/music") {
    content = (
      <div className="m-2 container text-red-600 font-extrabold text-xl">
        Error fetching data...
      </div>
    );
  } else {
    const contentData = !bookmarked
      ? data?.results?.filter((s) => s.kind === "song")
      : [];

    content = contentData.map((song) => {
      return (
        <MusicListItem
          key={song.trackId}
          song={song}
          bookmarked={bookmarked}
          play={play}
          setPlay={setPlay}
          preview={preview}
          setPreview={setPreview}
          previewName={previewName}
          setPreviewName={setPreviewName}
          previewLink={previewLink}
          setPreviewLink={setPreviewLink}
          timerIds={timerIds}
          setTimerIds={setTimerIds}
        />
      );
    });
  }

  return (
    <div className="mt-1 mb-5">
      {preview ? (
        <div className="sticky top-0 bg-black text-center text-white">
          <div className="h-fit mb-2">
            <button
              onClick={() => {
                clearTimeout(timerIds);
                setPreview(null);
                setPreviewName(null);
                setPreviewLink(null);
                setPlay(false);
                window.Amplitude.stop();
              }}
            >
              <div className="flex items-center">
                <div className="italic mr-2">
                  Now Previewing: {previewName},{" "}
                </div>
                <BsFillStopCircleFill />
                <span className="ml-1">click to stop</span>
              </div>
            </button>
          </div>
          <div>
            <a href={previewLink} target="blank" className="italic font-bold">
              Go to song
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 container font-extrabold text-xl">
          {!bookmarked && data?.results?.length > 0 ? "List of Songs" : ""}
        </h1>
      </div>
      <h1 className="m-2 container font-extrabold text-xl">
        {data?.results?.length === 0 ? "No Songs Found" : ""}
      </h1>
      {content}
    </div>
  );
}

export default MusicList;
