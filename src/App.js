import React, { useEffect, useState, Suspense } from "react";
import "./App.css";
import LoadingSpinner from "./components/LoadingSpinner";
const Header = React.lazy(() => import("./components/Header"));
const Map = React.lazy(() => import("./components/Map"));

function App() {
  //eslint-disable-next-line
  const [localIP, setLocalIP] = useState("");
  const [geoIP, setGeoIP] = useState("");
  //eslint-disable-next-line
  const [searchIP, setSearchIP] = useState("");

  useEffect(() => {
    //Fetch client IP
  }, []);

  async function getGeoIP(IP) {
    try {
      const response = await fetch(
        process.env.REACT_APP_GEO_API_KEY
          ? `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_GEO_API_KEY}&ipAddress=${IP}`
          : `/.netlify/functions/getGeoIP?ip=${IP}`
      );
      let data = await response.json();
      return setGeoIP(data);
    } catch (e) {
      console.log(e);
      return;
    }
  }

  useEffect(() => {
    if (
      sessionStorage.getItem("geoIP") !== null &&
      sessionStorage.getItem("geoIP") !== ""
    ) {
      setGeoIP(JSON.parse(sessionStorage.getItem("geoIP")));
    } else {
      async function getLocalIP() {
        try {
          const response = await fetch("https://jsonip.com");
          let data = await response.json();
          setLocalIP(data.ip);
          getGeoIP(data.ip);
          return;
        } catch (e) {
          getGeoIP("1.1.1.1");
          console.log(e);
          return;
        }
      }
      getLocalIP();
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("geoIP", JSON.stringify(geoIP));
  }, [geoIP]);

  return (
    <div className="w-screen h-screen bg-[#F2EFE9] m-auto overflow-hidden">
      <>
        <Suspense fallback={<LoadingSpinner />}>
          <Header
            geoIP={geoIP}
            getGeoIP={getGeoIP}
            searchIP={searchIP}
            setSearchIP={setSearchIP}
          />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Map lat={geoIP?.location?.lat} lng={geoIP?.location?.lng}></Map>
        </Suspense>
      </>
    </div>
  );
}

export default App;
