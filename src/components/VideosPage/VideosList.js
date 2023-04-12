import React from "react";
import { useSelector } from "react-redux";
import Skeleton from "../Skeleton";
import VideosListItem from "./VideosListItem";
import { useSetVideosSearchResults, useCheckAuthStatus } from "../../hooks";

function VideosList({ queryParameter, bookmarked, queryFn }) {
  useCheckAuthStatus();
  let queryObject = !bookmarked
    ? { videoTitle: queryParameter }
    : queryParameter;

  const { data, error, isFetching } = queryFn(queryObject);
  useSetVideosSearchResults(data);
  const { searchResults } = useSelector((state) => state.videoData);
  let content;
  if (isFetching) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (searchResults.length === 0 && data?.items?.length > 0) {
    content = (
      <div className="text-center mt-28 text-green-800 font-extrabold text-2xl">
        All the videos for this title have been saved, Search for a new video
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
    content = contentData.map((video) => {
      return (
        <VideosListItem key={video.id} video={video} bookmarked={bookmarked} />
      );
    });
  }

  return (
    <div className="mt-1 mb-5">
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 container font-extrabold max-[770px]:text-sm text-base">
          {!bookmarked && searchResults.length > 0
            ? `List of Videos for "${queryParameter.toUpperCase()}"`
            : ""}
          {bookmarked && data?.length > 0 ? "Your Videos" : ""}
        </h1>
      </div>
      <h1 className="m-2 container font-extrabold text-xl text-red-900">
        {!error && data?.items?.length === 0 && !isFetching
          ? "No Videos Found"
          : ""}
        {!error && bookmarked && !data?.length && !isFetching
          ? "You have not saved any videos yet."
          : ""}
      </h1>
      {content}
    </div>
  );
}

export default VideosList;
