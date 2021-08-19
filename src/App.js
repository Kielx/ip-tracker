import { useEffect, useState } from "react";

function App() {
  const [geoIP, setGeoIP] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sessionStorage.getItem("geoIP") &&
      setGeoIP(JSON.parse(sessionStorage.getItem("geoIP")));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("geoIP", JSON.stringify(geoIP));
  }, [geoIP]);

  async function getGeoIP(link) {
    setLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_GEO_API_KEY
          ? `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_GEO_API_KEY}`
          : `/.netlify/functions/getGeoIP`
      );
      let data = await response.json();
      setLoading(false);
      console.log(data);
      return setGeoIP(data);
    } catch (e) {
      console.log(e);
      return;
    }
  }

  return (
    <div className="bg-blue-500 h-screen grid">
      <div className="w-[50%] my-auto ml-20">
        <h1 className="text-[5rem] font-bold mb-10 text-white">
          JIT mode is cool
        </h1>
        <p className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo
          officia earum ducimus neque obcaecati consequuntur ratione accusamus
          at officiis tempore, magnam non debitis fugit unde alias id quidem
          necessitatibus.
        </p>
        <button onClick={getGeoIP} className="bg-red-600 w-[100px] h-[50px]">
          Get IP
        </button>
      </div>
    </div>
  );
}

export default App;
