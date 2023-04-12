import React from "react";
import { useSelector } from "react-redux";
import Skeleton from "../Skeleton";
import MusicListItem from "./MusicListItem";
import { BsFillStopCircleFill } from "react-icons/bs";
import { setPreviewPlayerSliceData, useStopPlayerMutation } from "../../store";
import { useSetMusicSearchResults, useCheckAuthStatus } from "../../hooks";

function MusicList({ queryParameter, bookmarked, queryFn }) {
  useCheckAuthStatus();
  const [stopPlayer] = useStopPlayerMutation();
  let queryObject = !bookmarked
    ? { songTitle: queryParameter }
    : queryParameter;
  const { data, error, isFetching } = queryFn(queryObject);
  useSetMusicSearchResults(data);
  const { searchResults } = useSelector((state) => state.musicData);
  const { previewPlayerData } = useSelector((state) => state);
  let content;
  if (isFetching) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (searchResults.length === 0 && data?.results?.length > 0) {
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
        <MusicListItem key={song.trackId} song={song} bookmarked={bookmarked} />
      );
    });
  }

  return (
    <div className="mt-1 mb-5">
      {previewPlayerData.preview ? (
        <div className="sticky top-0 bg-slate-300 text-pink-900 border-8 border-slate-600">
          <div className="h-fit mb-2">
            <button onClick={() => stopPlayer({ setPreviewPlayerSliceData })}>
              <div className="flex items-center">
                <div className="italic mr-2">
                  Now Previewing: {previewPlayerData.previewName},{" "}
                </div>
                <BsFillStopCircleFill />
                <span className="ml-1">click to stop</span>
              </div>
            </button>
          </div>
          <div>
            <a
              href={previewPlayerData.previewLink}
              target="blank"
              className="italic font-bold"
            >
              Go to song
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 container font-extrabold max-[770px]:text-sm text-base">
          {!bookmarked && searchResults.length > 0
            ? `List of Songs for "${queryParameter.toUpperCase()}"`
            : ""}
          {bookmarked && data?.length > 0 ? "Your Songs" : ""}
        </h1>
      </div>
      <h1 className="m-2 container font-extrabold text-xl text-red-900">
        {!error && data?.results?.length === 0 && !isFetching
          ? "No Songs Found"
          : ""}
        {!error && bookmarked && !data?.length && !isFetching
          ? "You have not saved any songs yet."
          : ""}
      </h1>
      {content}
    </div>
  );
}

export default MusicList;
