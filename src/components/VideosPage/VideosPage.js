import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import VideosList from "./VideosList";
import Button from "../Button";
import { FaSearch } from "react-icons/fa";
import { useSearchVideosQuery, useFetchUserVideosQuery } from "../../store";

const VideosPage = ({ bookmarkedPage }) => {
  const [videoTitle, setVideoTitle] = useState("");
  const [showList, setShowList] = useState(false);
  const { authUserId, listFetching } = useSelector((state) => {
    return {
      authUserId: state.authData.authUserId,
      listFetching: state.videoData.listFetching,
    };
  });

  return (
    <div className="container max-[770px]:text-sm text-center mt-2 p-2">
      <h5 className="text-right">
        {!bookmarkedPage ? (
          <Link
            className="text-blue-900 italic font-bold max-[770px]:text-base text-lg"
            to="/videos/bookmarked"
          >
            Bookmarked
          </Link>
        ) : (
          <Link
            className="text-blue-900 italic font-bold max-[770px]:text-base text-lg"
            to="/videos"
          >
            Back to Search
          </Link>
        )}
      </h5>
      {bookmarkedPage ? (
        <VideosList
          queryParameter={authUserId}
          bookmarked={true}
          queryFn={useFetchUserVideosQuery}
        />
      ) : (
        <>
          <div>
            <h2 className="max-[770px]:text-base text-lg font-bold mb-1">
              Find Videos
            </h2>
            <div className="flex justify-center">
              <form
                onSubmit={(event) => event.preventDefault()}
                className="relative w-3/4 max-[770px]:w-full m-2"
              >
                <input
                  type="text"
                  className="h-14 w-full pl-14 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                  placeholder="Video Title (Required)"
                  value={videoTitle}
                  onChange={(event) => {
                    setVideoTitle(event.target.value);
                    setShowList(false);
                  }}
                />
                <div className="absolute top-2 left-1">
                  <Button
                    disabled={!videoTitle}
                    loading={listFetching}
                    onClick={() => setShowList(true)}
                    className={`h-fit w-fit border-0 ${
                      videoTitle
                        ? "text-blue-900 hover:text-green-900"
                        : "text-slate-300"
                    } ${listFetching ? "text-green-900 text-2xl" : ""}`}
                  >
                    <FaSearch size={30} />
                  </Button>
                </div>
              </form>
            </div>
          </div>
          {showList ? (
            <VideosList
              queryParameter={videoTitle}
              bookmarked={false}
              queryFn={useSearchVideosQuery}
            />
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default VideosPage;
