import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-[#0f172a] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-[#79b8f3] hover:text-white transition">
          🎬 Swathi Movie App
        </Link>
        <div className="hidden md:flex gap-6 text-gray-300">
          <Link to="/" className="hover:text-white transition">Home</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
