import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 overflow-hidden">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.jpg"}
        alt={movie.Title}
        className="w-full h-[400px] object-cover"
      />
      <div className="p-4 text-center">
        <h1 className="text-lg font-semibold text-white truncate">{movie.Title}</h1>
        <p className="text-gray-400 text-sm mt-1">Released: {movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
