import React, { useEffect, useState, useCallback  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { GET_MOVIE_API } from "../utils/constant";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
const MovieList = () => {
  const [movielist, setmovielist] = useState([]);
  const [query, setQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("Harry");
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

   useEffect(() => {
    getMovielist(lastQuery, filter);
  }, [getMovielist, lastQuery, filter]);

  const getMovielist = useCallback(async (search, type = filter) => {
    const searchquery = search || "Harry";
    let url = `${GET_MOVIE_API}&s=${searchquery}`;
    if (type) url += `&type=${type}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      setmovielist(json.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, [filter]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLastQuery(query);
    getMovielist(query);
  };

  const handleFilter = (val) => {
    setFilter(val === "All" ? "" : val.toLowerCase());
    setIsOpen(false);
  };

  
  if (movielist?.length === 0) {
   navigate("/notfound")
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
   
      <div className="text-center py-10">
        <div className="flex justify-center items-center gap-3">
          <input
            type="text"
            className="w-[300px] md:w-[400px] rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b8f3]"
            placeholder="Search for a movie..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-[#79b8f3] text-white px-4 py-2 rounded-lg hover:bg-[#5da5e0] transition"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>

          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex justify-center w-40 rounded-lg border border-gray-600 bg-[#1e293b] px-4 py-2 text-sm font-medium text-gray-200 hover:bg-[#334155] focus:outline-none"
            >
              Filter
              <svg
                className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute left-0 mt-2 w-40 origin-top-right rounded-lg bg-[#1e293b] shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {["All", "Movie", "Series", "Episode"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleFilter(opt)}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-[#334155]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-20">
        {movielist?.map((movie, index) => (
          <Link key={index} to={`/details?mv=${movie.imdbID}`}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
