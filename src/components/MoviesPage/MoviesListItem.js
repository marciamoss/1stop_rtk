import React, { useState } from "react";
import { useSelector } from "react-redux";
import ExpandablePanel from "../ExpandablePanel";
import ConfirmModal from "../ConfirmModal";
import {
  BsFillBookmarkHeartFill,
  BsFillBookmarkDashFill,
} from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import { MdOutlineLocalMovies } from "react-icons/md";
import { useDeleteUserMovieMutation } from "../../store";
import { useMoviesAction, useFormatDate } from "../../hooks";

function MoviesListItem({ movie, bookmarked }) {
  const { rDate } = useFormatDate(movie?.releaseDate);

  const { authUserId, savedId, saveFailId, deleteFailId } = useSelector(
    (state) => {
      return {
        savedId: state.movieData.savedId,
        saveFailId: state.movieData.saveFailId,
        deleteFailId: state.movieData.deleteFailId,
        authUserId: state.authData.authUserId,
      };
    }
  );
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteUserMovie] = useDeleteUserMovieMutation();

  const { saveMovie, previouslySaved } = useMoviesAction(authUserId);

  const handleAddRemove = () => {
    if (!bookmarked) {
      saveMovie(movie);
    } else {
      setDeleteConfirm(true);
    }
  };

  const header = (
    <>
      <button className="mr-3" onClick={handleAddRemove}>
        {!bookmarked ? <BsFillBookmarkHeartFill /> : <BsFillBookmarkDashFill />}
      </button>
      <div>
        {movie.title}
        <div className="text-sm italic">
          {movie.certificate || "N/A"}, Released: {rDate || "N/A"}
        </div>
      </div>
    </>
  );

  return (
    <div className="text-base">
      {deleteConfirm ? (
        <ConfirmModal
          setDeleteConfirm={setDeleteConfirm}
          deleteFn={deleteUserMovie}
          current={movie}
          confirmMessage={`Delete Confirmation on "${movie.title}"?`}
        />
      ) : (
        ""
      )}
      {savedId === movie.id ||
      previouslySaved ||
      saveFailId === movie.id ||
      deleteFailId === movie.id ? (
        <div
          className={`flex items-center ${
            saveFailId || deleteFailId ? "bg-red-500" : "bg-green-500"
          } text-white text-lg font-bold px-4 py-3" role="alert"`}
        >
          <FaInfoCircle />
          {saveFailId || deleteFailId ? (
            <p className="ml-1">Action Failed At This Time!</p>
          ) : (
            <p className="ml-1">
              {previouslySaved
                ? ` Previously Bookmarked: "${movie.title}"`
                : `Bookmarked "${movie.title}"`}
            </p>
          )}
        </div>
      ) : (
        ""
      )}
      <ExpandablePanel header={header}>
        <div className="text-base max-[770px]:text-sm">
          <div key={movie.id} className="content flex py-2">
            {movie.posterUrl ? (
              <a
                href={`https://www.imdb.com${movie.id}`}
                target="blank"
                className="italic text-blue-600"
              >
                <img
                  className="inline h-20 w-20"
                  src={movie.posterUrl}
                  alt="N/A"
                />
              </a>
            ) : (
              <a
                href={`https://www.imdb.com${movie.id}`}
                target="blank"
                className="italic text-blue-600"
              >
                <MdOutlineLocalMovies className="inline h-20 w-20" />
              </a>
            )}

            <div className="item-body px-2 ">
              <b>Plot:</b> {movie.summary || "N/A"}
              <div className="italic md:indent-12">
                <b>Genres:</b> {movie.genres || "N/A"}
              </div>
              <div className="italic md:indent-12">
                <b>Cast:</b> {movie.cast || "N/A"}
              </div>
              <div className="italic md:indent-12">
                <b>Running Time</b>
                <sub className="ml-1 font-features sups">(in mins)</sub> :{" "}
                {movie.runningTimeInMinutes || "N/A"}, <b>Ratings:</b>{" "}
                {movie.rating || "N/A"}
              </div>
            </div>
          </div>
        </div>
      </ExpandablePanel>
    </div>
  );
}
export default MoviesListItem;
