import React, { useState } from "react";
import { useSelector } from "react-redux";
import Skeleton from "../Skeleton";
import MusicListItem from "./MusicListItem";
import { BsFillStopCircleFill } from "react-icons/bs";
import { useSetMusicSearchResults } from "../../hooks";

function MusicList({ queryParameter, bookmarked, queryFn }) {
  let queryObject = !bookmarked
    ? { songTitle: queryParameter }
    : queryParameter;
  const { data, error, isFetching } = queryFn(queryObject);
  useSetMusicSearchResults(data);

  const [play, setPlay] = useState(false);
  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState(null);
  const [previewLink, setPreviewLink] = useState(null);
  const [timerIds, setTimerIds] = useState([]);
  const { searchResults } = useSelector((state) => {
    return {
      searchResults: state.musicData.searchResults,
    };
  });

  let content;
  if (isFetching) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (
    searchResults.length === 0 &&
    data?.results?.filter((s) => s.kind === "song").length > 0
  ) {
    content = (
      <div className="text-center mt-28 text-green-800 font-extrabold text-2xl">
        All the songs for this title have been saved, Search for a new song
      </div>
    );
  } else if (error) {
    content = (
      <div className="m-2 container text-red-600 font-extrabold text-xl">
        Error fetching data...
      </div>
    );
  } else {
    const contentData = !bookmarked ? searchResults : data;
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
        <div className="sticky top-0 bg-slate-300 text-pink-900 border-8 border-slate-600">
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
        <h1 className="m-2 container font-extrabold max-[770px]:text-sm text-base">
          {!bookmarked && searchResults.length > 0 ? "List of Songs" : ""}
          {bookmarked && data?.length > 0 ? "Your Songs" : ""}
        </h1>
      </div>
      <h1 className="m-2 container font-extrabold text-xl text-red-900">
        {!error && data?.results?.filter((s) => s.kind === "song").length === 0
          ? "No Songs Found"
          : ""}
        {!error && bookmarked && !data?.length
          ? "You have not saved any songs yet."
          : ""}
      </h1>
      {content}
    </div>
  );
}

export default MusicList;
