import React, { useEffect, useState, Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";
const Header = React.lazy(() =>
  import(/* webpackChunkName: "Header" */ "./components/Header")
);
const Map = React.lazy(() =>
  import(/* webpackChunkName: "Map" */ "./components/Map")
);

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
    const ipRegexp = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/;
    const domainRegexp =
      /^(?=.{1,253}\.?$)(?:(?!-|[^.]+_)[A-Za-z0-9-_]{1,63}(?<!-)(?:\.|$)){2,}$/;

    const emailRegexp =
      // eslint-disable-next-line no-control-regex
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (ipRegexp.test(IP)) {
      try {
        //Remove when goes to prod
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
    if (domainRegexp.test(IP)) {
      try {
        //Remove when goes to prod
        const response = await fetch(
          process.env.REACT_APP_GEO_API_KEY
            ? `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_GEO_API_KEY}&domain=${IP}`
            : `/.netlify/functions/getGeoIP?domain=${IP}`
        );
        let data = await response.json();
        return setGeoIP(data);
      } catch (e) {
        console.log(e);
        return;
      }
    }
    if (emailRegexp.test(IP)) {
      try {
        //Remove when goes to prod
        const response = await fetch(
          process.env.REACT_APP_GEO_API_KEY
            ? `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_GEO_API_KEY}&email=${IP}`
            : `/.netlify/functions/getGeoIP?email=${IP}`
        );
        let data = await response.json();
        return setGeoIP(data);
      } catch (e) {
        console.log(e);
        return;
      }
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
          const response = await fetch("https://jsonip.com", { mode: "cors" });
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
      <Suspense fallback={<LoadingSpinner />}>
        <Header
          geoIP={geoIP}
          getGeoIP={getGeoIP}
          searchIP={searchIP}
          setSearchIP={setSearchIP}
        />
        <Map lat={geoIP?.location?.lat} lng={geoIP?.location?.lng}></Map>
      </Suspense>
    </div>
  );
}

export default App;
