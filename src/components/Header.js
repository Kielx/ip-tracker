import React from "react";
import background from "../assets/images/pattern-bg.png";
import { Popover, Transition } from "@headlessui/react";

const Header = ({ geoIP, getGeoIP, searchIP, setSearchIP }) => {
  const menu = (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="text-xs font-extrabold text-gray-500">IP ADDRESS</div>
        <div className="text-xl font-extrabold text-center">{geoIP.ip}</div>
      </div>
      <div className="spacer w-[10px] h-full bg-gray-800"></div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-xs font-extrabold text-gray-500">LOCATION</div>
        <div className="text-xl font-extrabold text-center">{`${geoIP.location.country}, ${geoIP.location.region}, ${geoIP.location.city}`}</div>
      </div>
      <div className="spacer w-[1.5px] h-full bg-gray-300"></div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-xs font-extrabold text-gray-500">TIMEZONE</div>
        <div className="text-xl font-extrabold text-center">
          {geoIP.location.timezone}
        </div>
      </div>
      <div className="spacer w-1 h-full bg-gray-800"></div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-xs font-extrabold text-gray-500">ISP</div>
        <div className="text-xl font-extrabold text-center">{geoIP.isp}</div>
      </div>
    </>
  );

  return (
    <div
      style={{ backgroundImage: `url(${background})`, zIndex: "2" }}
      className="lg:pb-24 w-full  bg-cover bg-left  flex flex-col items-center py-6 space-y-5 md:space-y-8 px-4 xl:px-52 relative"
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
          className="w-[15%]  hover:bg-indigo-800 transition-all bg-gray-800 text-gray-100 rounded-r-2xl  flex justify-center items-center"
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
      <Popover
        className=" md:hidden  relative flex w-full  justify-center"
        style={{ zIndex: "2" }}
      >
        <Popover.Button className="text-white hover:text-indigo-400 transition-all ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Popover.Button>
        <Transition
          className="absolute flex w-full  justify-center"
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Popover.Panel className="absolute -bottom-72 z-10 w-full bg-white rounded-2xl shadow-xl py-6 space-y-1">
            {menu}
          </Popover.Panel>
        </Transition>
      </Popover>
      <div
        style={{ zIndex: "2" }}
        /*         className={`hidden shadow-xl "md:absolute" xl:py-10 w-full max-w-lg md:max-w-full md:-bottom-16 md:w-[90%] lg:w-[75%] md:flex flex-col space-y-1 bg-white rounded-2xl py-6  md:flex-row md:space-y-0 md:px-10 md:space-x-10 md:justify-around lg:px-20 
        }`} */
        className={`hidden shadow-xl md:flex flex-row w-[90%] lg:w-[75%] space-x-4 lg:space-x-10 bg-white p-10 absolute -bottom-40 lg:-bottom-16 justify-around items-start rounded-2xl`}
      >
        {menu}
      </div>
    </div>
  );
};

export default Header;
