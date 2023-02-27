import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MusicList from "./MusicList";
import Button from "../Button";
import { FaSearch } from "react-icons/fa";
import { useSearchMusicQuery, useFetchUserSongsQuery } from "../../store";

const MusicPage = ({ bookmarkedPage }) => {
  const [songTitle, setSongTitle] = useState("");
  const [showList, setShowList] = useState(false);
  const { authUserId, listFetching } = useSelector((state) => {
    return {
      authUserId: state.authData.authUserId,
      listFetching: state.musicData.listFetching,
    };
  });

  return (
    <div className="container max-[770px]:text-sm text-center mt-2 p-2">
      <h5 className="text-right">
        {!bookmarkedPage ? (
          <Link
            className="text-blue-900 italic font-bold max-[770px]:text-base text-lg"
            to="/music/bookmarked"
          >
            Bookmarked
          </Link>
        ) : (
          <Link
            className="text-blue-900 italic font-bold max-[770px]:text-base text-lg"
            to="/music"
          >
            Back to Search
          </Link>
        )}
      </h5>
      {bookmarkedPage ? (
        <MusicList
          queryParameter={authUserId}
          bookmarked={true}
          queryFn={useFetchUserSongsQuery}
        />
      ) : (
        <>
          <div>
            <h2 className="max-[770px]:text-base text-lg font-bold mb-1">
              Find a song
            </h2>
            <div className="flex justify-center">
              <form
                onSubmit={(event) => event.preventDefault()}
                className="relative w-3/4 max-[770px]:w-full m-2"
              >
                <input
                  type="text"
                  className="h-14 w-full pl-14 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                  placeholder="Song Title (Required)"
                  value={songTitle}
                  onChange={(event) => {
                    setSongTitle(event.target.value);
                    setShowList(false);
                  }}
                />
                <div className="absolute top-2 left-1">
                  <Button
                    disabled={!songTitle}
                    loading={listFetching}
                    onClick={() => setShowList(true)}
                    className={`h-fit w-fit border-0 ${
                      songTitle
                        ? "text-blue-900 hover:text-green-900"
                        : "text-slate-300"
                    }`}
                  >
                    <FaSearch size={30} />
                  </Button>
                </div>
              </form>
            </div>
          </div>
          {showList ? (
            <MusicList
              queryParameter={songTitle}
              bookmarked={false}
              queryFn={useSearchMusicQuery}
            />
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default MusicPage;
