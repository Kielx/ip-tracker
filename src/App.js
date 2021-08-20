import { useEffect, useState } from "react";
import Map from "./components/map";

function App() {
  const [localIP, setLocalIP] = useState("");
  const [geoIP, setGeoIP] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchIP, setSearchIP] = useState("");

  useEffect(() => {
    //Fetch client IP
    async function getLocalIP() {
      try {
        const response = await fetch("https://jsonip.com/");
        let data = await response.json();
        setLocalIP(data.ip);
        return;
      } catch (e) {
        console.log(e);
        return;
      }
    }
    getLocalIP();
  }, []);

  async function getGeoIP(IP) {
    setLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_GEO_API_KEY
          ? `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_GEO_API_KEY}&ipAddress=${IP}`
          : `/.netlify/functions/getGeoIP?ip=${IP}`
      );
      let data = await response.json();
      setLoading(false);
      return setGeoIP(data);
    } catch (e) {
      setLoading(false);
      console.log(e);
      return;
    }
  }

  useEffect(() => {
    localStorage.getItem("geoIP") &&
      setGeoIP(JSON.parse(localStorage.getItem("geoIP")));
  }, []);

  useEffect(() => {
    localStorage.setItem("geoIP", JSON.stringify(geoIP));
  }, [geoIP]);

  return (
    <div className="bg-blue-500 h-screen grid">
      <div className="w-[50%] my-auto ml-20">
        <h1 className="text-center text-3xl font-extrabold text-white">
          IP-Tracker
        </h1>
        {!loading ? (
          <h2 className="text-[5rem] font-bold mb-10 text-white">{localIP}</h2>
        ) : (
          <h2 className="text-[5rem] font-bold mb-10 text-white">
            Loading your app...
          </h2>
        )}
        <p className="text-white">{geoIP?.location?.country}</p>
        <p className="text-white">{geoIP?.location?.region}</p>
        <p className="text-white">{geoIP?.location?.city}</p>
        <button
          onClick={() => getGeoIP(localIP)}
          className="bg-red-600 w-[100px] h-[50px]"
        >
          Get IP
        </button>
        <input
          type="text"
          value={searchIP}
          onChange={(e) => setSearchIP(e.target.value)}
        ></input>
        <button onClick={() => getGeoIP(searchIP)}>Search for IP</button>
      </div>
      {geoIP ? (
        <Map lat={geoIP?.location?.lat} lng={geoIP?.location?.lng}></Map>
      ) : null}
    </div>
  );
}

export default App;
