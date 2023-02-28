import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NewsList from "./NewsList";
import Button from "../Button";
import Dropdown from "../Dropdown";
import { SECTIONS } from "../../constants/types";
import { FaSearch } from "react-icons/fa";
import { useSearchNewsQuery, useFetchUserArticlesQuery } from "../../store";

const NewsPage = ({ bookmarkedPage }) => {
  const [section, setSection] = useState("");
  const [showList, setShowList] = useState(false);
  const { authUserId, listFetching } = useSelector((state) => {
    return {
      authUserId: state.authData.authUserId,
      listFetching: state.newsData.listFetching,
    };
  });

  return (
    <div className="container max-[770px]:text-sm text-xl text-center mt-2 p-2">
      <h5 className="text-right">
        {!bookmarkedPage ? (
          <Link
            className="text-blue-900 italic font-bold max-[770px]:text-lg text-2xl"
            to="/news/bookmarked"
          >
            Bookmarked
          </Link>
        ) : (
          <Link
            className="text-blue-900 italic font-bold max-[770px]:text-lg text-2xl"
            to="/news"
          >
            Back to Search
          </Link>
        )}
      </h5>
      {bookmarkedPage ? (
        <NewsList
          queryParameter={authUserId}
          bookmarked={bookmarkedPage}
          queryFn={useFetchUserArticlesQuery}
        />
      ) : (
        <>
          <div className="flex">
            <div className="relative w-1/3 max-[770px]:w-full m-2">
              <Dropdown
                options={SECTIONS}
                value={section}
                onChange={(option) => setSection(option)}
                category={"Pick a news category"}
              />
              <p className="text-sm text-green-900 font-bold">
                {" "}
                *click the search icon to the left to fetch news
              </p>
              <div className="absolute top-10 left-1 max-[770px]:top-8">
                <Button
                  disabled={!section}
                  loading={listFetching}
                  onClick={() => setShowList(true)}
                  className={`h-fit w-fit border-0 ${
                    section
                      ? "text-blue-900 hover:text-green-900"
                      : "text-slate-300"
                  }  ${listFetching ? "text-green-900 text-2xl" : ""}`}
                >
                  <FaSearch size={30} />
                </Button>
              </div>
            </div>
          </div>
          {showList || section ? (
            <NewsList
              queryParameter={section}
              bookmarked={false}
              queryFn={useSearchNewsQuery}
            />
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default NewsPage;
