import React from 'react'
import { useNavigate } from 'react-router-dom';
const Err = () => {

  const navigate = useNavigate();  
  return (
    <div>
        <div className="flex flex-col items-center justify-center h-[70vh] text-gray-400">
        <p className="text-xl font-medium mb-3">🎞️ Not found</p>
        <p className="text-gray-500">Try searching for another title.</p>
        <button
        onClick={() => navigate("/")} 
        className="bg-[#1e40af] hover:bg-[#2563eb] text-white font-medium px-5 py-2 rounded-lg shadow-md transition-transform hover:scale-105"
      >
        🔙 Back to Movies
      </button>
      </div>
    </div>
  )
}

export default Err;


