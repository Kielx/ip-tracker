import React from "react";
import background from "../assets/images/pattern-bg.png";

const Header = () => {
  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="w-full h-[40vh] bg-cover bg-left  flex flex-col items-center pt-5 space-y-5"
    >
      <span className="text-2xl text-white font-bold">IP Address Tracker</span>
      <form className="w-full px-4">
        <input
          type="text"
          value="Input IP you would like to search"
          className="w-[85%] h-full p-4 rounded-l-3xl"
        ></input>
        <button className="w-[15%] h-full bg-gray-900 text-gray-100 rounded-r-3xl">
          >
        </button>
      </form>
    </div>
  );
};

export default Header;
