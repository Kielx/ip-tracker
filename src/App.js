import React, { useEffect, useState, Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";
const Header = React.lazy(() =>
  import(/* webpackChunkName: "Header" */ "./components/Header")
);
const Map = React.lazy(() =>
  import(/* webpackChunkName: "Map" */ "./components/Map")
);

// Resolve domain name to ip address
export async function getIPFromDomain(domain){
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}`, { mode: "cors" });
    let data = await response.json();
    return data.Answer[0].data;
  } catch (e) {
    return null;
  }
}

function App() {
  //eslint-disable-next-line
  const [localIP, setLocalIP] = useState("");
  const [geoIP, setGeoIP] = useState("");
  //eslint-disable-next-line
  const [searchIP, setSearchIP] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    //Fetch client IP
  }, []);

  async function getGeoIP(IP) {
    //List of regexp rules to check if IP is valid IPv4 or domain name
    const rules = [
      {
        name: "ipRegexp",
        regexp: /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/,
        query: "ipAddress",
      },
      {
        name: "domainRegexp",
        regexp: /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/,
        query: "domain",
      },
    ];

    // If IP is not valid IPv4 or domain name, return
    if (!rules[0].regexp.test(IP) && !rules[1].regexp.test(IP)) {
      setError(true);
      return;
    }

    // If IP is domain name, resolve to IP address
    if (rules[1].regexp.test(IP)) {
      const ip = await getIPFromDomain(IP);
      if(ip){
        IP = ip;
      }
    }

    // If IP is valid IPv4 or domain name, fetch geoIP data
    if (rules[0].regexp.test(IP)) {
        try {
          //Remove when goes to prod
          setError(false);
          const response = await fetch(
            process.env.REACT_APP_GEO_API_KEY
              ? `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_GEO_API_KEY}&ip=${IP}`
              : `/.netlify/functions/getGeoIP?ip=${IP}`
          );
          if (!response.ok) {
            setError(true);
            return;
          }
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
          error={error}
        />
        <Map lat={geoIP?.latitude} lng={geoIP?.longitude}></Map>
      </Suspense>
    </div>
  );
}

export default App;
