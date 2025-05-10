import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import Search from "./Search";
import SelectMenu from "./SelectMenu";

const ActionWrapper = ({ setQuery }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFavoritesClick = () => {
    navigate("/favourites"); // Navigate to the Favorites page when clicked
  };

  return (
    <div className="flex items-center justify-between pt-10">
      <Search setQuery={setQuery} />
      <SelectMenu setQuery={setQuery} />
      
      {/* Button to navigate to the Favorites page */}
      <button
        onClick={handleFavoritesClick}
        className="bg-red-600 text-white hover:bg-indigo-700 font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-200"
      >
        Favourites
      </button>
    </div>
  );
};

export default ActionWrapper;
