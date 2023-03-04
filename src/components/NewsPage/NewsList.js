import React from "react";
import { useSelector } from "react-redux";
import Skeleton from "../Skeleton";
import NewsListItem from "./NewsListItem";
import { useSetNewsSearchResults } from "../../hooks";

function NewsList({ queryParameter, bookmarked, queryFn }) {
  let queryObject = !bookmarked ? { section: queryParameter } : queryParameter;
  const { data, error, isFetching } = queryFn(queryObject);
  useSetNewsSearchResults(data);

  const { searchResults } = useSelector((state) => {
    return {
      searchResults: state.newsData.searchResults,
    };
  });

  let content;
  if (isFetching) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (searchResults.length === 0 && data?.results?.length > 0) {
    content = (
      <div className="text-center mt-28 text-green-800 font-extrabold text-2xl">
        All the articles for this section have been saved, Search for a
        different news section
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
    content = contentData.map((news) => {
      return (
        <NewsListItem key={news.uri} news={news} bookmarked={bookmarked} />
      );
    });
  }

  return (
    <div className="mt-1 mb-5">
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 container font-extrabold max-[770px]:text-sm text-base">
          {!bookmarked && searchResults.length > 0
            ? `News List for "${queryParameter.toUpperCase()}"`
            : ""}
          {bookmarked && data?.length > 0 ? "Your Articles" : ""}
        </h1>
      </div>
      <h1 className="m-2 container font-extrabold text-xl text-red-900">
        {!error && data?.results?.length === 0 && !isFetching
          ? "No Articles Found"
          : ""}
        {!error && bookmarked && !data?.length && !isFetching
          ? "You have not saved any news articles yet."
          : ""}
      </h1>
      {content}
    </div>
  );
}

export default NewsList;
