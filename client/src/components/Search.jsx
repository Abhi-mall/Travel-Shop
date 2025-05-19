import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchComponent = () => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search..."
        className="pl-10 pr-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#EC1380]"
      />
      <IoSearchOutline className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default SearchComponent;
