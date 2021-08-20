import React from "react";
import background from "../assets/images/pattern-bg.png";

const Header = () => {
  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="w-full h-[40vh] bg-cover bg-left  flex flex-col items-center pt-5 space-y-5 px-4"
    >
      <span className="text-2xl text-white font-bold">IP Address Tracker</span>
      <form className="w-full flex">
        <input
          type="text"
          value="192.212.174.101"
          className="w-[85%]  p-4 rounded-l-2xl font-medium"
        ></input>
        <button className="w-[15%]  bg-gray-800 text-gray-100 rounded-r-2xl  flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-chevron-right"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </form>
      <div className="w-full flex flex-col space-y-3 bg-white rounded-2xl py-6">
        <div className="flex flex-col justify-center items-center">
          <div className="text-xs font-extrabold text-gray-500">IP ADDRESS</div>
          <div className="text-xl font-extrabold">192.212.174.101</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-xs font-extrabold text-gray-500">LOCATION</div>
          <div className="text-xl font-extrabold">Brooklyn, NY 10001</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-xs font-extrabold text-gray-500">TIMEZONE</div>
          <div className="text-xl font-extrabold">UTC-05:00</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-xs font-extrabold text-gray-500">ISP</div>
          <div className="text-xl font-extrabold">SpaceX Starlink</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
