import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { GET_MOVIE_API } from "../utils/constant";

const MovieDetails = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("mv");

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  // ⭐ User Rating State
  const [userRating, setUserRating] = useState(0);

  const getDetails = useCallback(async () => {
    const data = await fetch(`${GET_MOVIE_API}&i=${query}`);
    const json = await data.json();
    setDetails(json);
    setLoading(false);
  }, [query]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  // ⭐ Star Rating UI Component
  const StarRating = ({ rating, onRate }) => {
    return (
      <div className="flex gap-2 mt-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => onRate(star)}
            className={`cursor-pointer text-3xl transition-transform ${
              star <= rating ? "text-yellow-400" : "text-gray-500"
            } hover:scale-110`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-400 text-xl animate-pulse">
        Loading movie details...
      </div>
    );
  }

  if (!details?.Title) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] text-gray-400">
        <p className="text-2xl font-semibold">🎬 Movie not found</p>
        <p className="text-gray-500 mt-2">
          Try searching again from the home page.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white flex flex-col lg:flex-row items-start gap-10 px-8 py-10 md:px-20 md:py-16 animate-fadeIn">
      {/* Poster */}
      <div className="flex-shrink-0 w-full lg:w-[400px] flex justify-center">
        <img
          src={details.Poster !== "N/A" ? details.Poster : "/no-poster.jpg"}
          alt={details.Title}
          className="rounded-2xl shadow-lg w-[300px] md:w-[400px] h-auto object-cover border border-gray-700"
        />
      </div>

      {/* Details */}
      <div className="flex-1 space-y-5">
        <h1 className="text-4xl md:text-5xl font-bold text-[#79b8f3] drop-shadow-lg">
          {details.Title}
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed">
          {details.Plot}
        </p>

        {/* Info Blocks */}
        <div className="flex flex-wrap gap-6 text-sm md:text-base mt-6">
          <div className="bg-[#1e293b] rounded-lg px-4 py-2">
            <span className="text-[#79b8f3] font-semibold">Released:</span>{" "}
            {details.Released}
          </div>

          <div className="bg-[#1e293b] rounded-lg px-4 py-2">
            <span className="text-[#79b8f3] font-semibold">⭐ IMDb:</span>{" "}
            {details.imdbRating}
          </div>

          <div className="bg-[#1e293b] rounded-lg px-4 py-2">
            <span className="text-[#79b8f3] font-semibold">Runtime:</span>{" "}
            {details.Runtime}
          </div>

          <div className="bg-[#1e293b] rounded-lg px-4 py-2">
            <span className="text-[#79b8f3] font-semibold">Votes:</span>{" "}
            {details.imdbVotes}
          </div>
        </div>

        {/* ⭐ User Star Rating Section */}
        <div className="mt-8 bg-[#1e293b] rounded-xl p-4 w-fit">
          <p className="text-lg font-semibold text-[#79b8f3]">
            Your Rating
          </p>

          <StarRating rating={userRating} onRate={setUserRating} />

          {userRating > 0 && (
            <p className="mt-2 text-sm text-gray-300">
              You rated this movie:{" "}
              <span className="font-bold text-yellow-400">
                {userRating} / 5
              </span>
            </p>
          )}
        </div>

        {/* Extra Details */}
        <div className="space-y-2 text-gray-300 mt-8">
          <p>
            <span className="text-[#79b8f3] font-semibold">Director:</span>{" "}
            {details.Director}
          </p>
          <p>
            <span className="text-[#79b8f3] font-semibold">Writer:</span>{" "}
            {details.Writer}
          </p>
          <p>
            <span className="text-[#79b8f3] font-semibold">Actors:</span>{" "}
            {details.Actors}
          </p>
          <p>
            <span className="text-[#79b8f3] font-semibold">Genre:</span>{" "}
            {details.Genre}
          </p>
          <p>
            <span className="text-[#79b8f3] font-semibold">Language:</span>{" "}
            {details.Language}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
