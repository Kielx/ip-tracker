import React from "react";
import background from "../assets/images/pattern-bg.png";

const Header = ({ geoIP, getGeoIP, searchIP, setSearchIP }) => {
  return (
    <div
      style={{ backgroundImage: `url(${background})`, zIndex: "2" }}
      className="w-full h-[30vh] bg-cover bg-left  flex flex-col items-center pt-5 space-y-5 md:space-y-8 px-4 xl:px-52 relative"
    >
      <span className="text-2xl md:text-3xl text-white font-bold">
        IP Address Tracker
      </span>
      <form className="w-full max-w-lg flex">
        <input
          placeholder={geoIP.ip}
          type="text"
          value={searchIP}
          onChange={(e) => setSearchIP(e.target.value)}
          className="w-[85%]  p-3 rounded-l-2xl font-medium"
        ></input>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            getGeoIP(searchIP);
          }}
          className="w-[15%]  bg-gray-800 text-gray-100 rounded-r-2xl  flex justify-center items-center"
        >
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
      <div
        style={{ zIndex: "2" }}
        className={`shadow-xl  xl:py-10 w-full max-w-lg md:max-w-full md:-bottom-16 md:w-[90%] lg:w-[75%] flex flex-col space-y-1 bg-white rounded-2xl py-6  md:flex-row md:space-y-0 md:px-10 md:space-x-10 md:justify-around lg:px-20 ${
          window.innerHeight < 800 ? "static" : "md:absolute"
        }`}
      >
        {console.log(window.innerHeight)}
        <div className="flex flex-col justify-center items-center">
          <div className="text-xs font-extrabold text-gray-500">IP ADDRESS</div>
          <div className="md:text-xl font-extrabold">{geoIP.ip}</div>
        </div>
        <div className="spacer w-[1px] h-full bg-gray-300"></div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-xs font-extrabold text-gray-500">LOCATION</div>
          <div className="md:text-xl font-extrabold">{`${geoIP.location.country}, ${geoIP.location.region}, ${geoIP.location.city}`}</div>
        </div>
        <div className="spacer w-[1.5px] h-full bg-gray-300"></div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-xs font-extrabold text-gray-500">TIMEZONE</div>
          <div className="md:text-xl font-extrabold">
            {geoIP.location.timezone}
          </div>
        </div>
        <div className="spacer w-[1.5px] h-full bg-gray-300"></div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-xs font-extrabold text-gray-500">ISP</div>
          <div className="md:text-xl font-extrabold">{geoIP.isp}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
