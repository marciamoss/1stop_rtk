import React, { useState } from "react";
import { Link } from "react-router-dom";
import MusicList from "./MusicList";
import Button from "../Button";
import { FaSearch } from "react-icons/fa";

const MusicPage = ({ bookmarkedPage }) => {
  const [songTitle, setSongTitle] = useState("");
  const [showList, setShowList] = useState(false);

  return (
    <div className="container max-[770px]:text-sm text-xl text-center mt-2 p-2">
      <h5 className="text-right">
        {!bookmarkedPage ? (
          <Link
            className="text-blue-900 italic font-bold max-[770px]:text-lg text-2xl"
            to="/music/bookmarked"
          >
            Bookmarked
          </Link>
        ) : (
          <Link
            className="text-blue-900 italic font-bold max-[770px]:text-lg text-2xl"
            to="/music"
          >
            Back to Search
          </Link>
        )}
      </h5>
      {bookmarkedPage ? (
        <MusicList bookmarked={bookmarkedPage} />
      ) : (
        <>
          <div>
            <h2 className="text-2xl font-bold mb-1">Find a song</h2>
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
                  onChange={(event) => setSongTitle(event.target.value)}
                />
                <div className="absolute top-2 left-1">
                  <Button
                    disabled={!songTitle}
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
            <MusicList songTitle={songTitle} bookmarked={false} />
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default MusicPage;
