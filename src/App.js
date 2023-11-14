import React, { useEffect, Suspense, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";
import { getGeolocation } from "./services/GeolocationService";

const Header = React.lazy(() =>
  import(/* webpackChunkName: "Header" */ "./components/Header")
);
const Map = React.lazy(() =>
  import(/* webpackChunkName: "Map" */ "./components/Map")
);

function App() {
  const [geoLocationData, setGeoLocationData] = useState(null);

  useEffect(() => {
    if(process.env.NODE_ENV === "development"){
    getGeolocation().then((data) => {
      setGeoLocationData(data);
    })}
    else {
      fetch(`/.netlify/functions/getGeoLocation`)
      .then((res) => res.json())
      .then((data) => {
        setGeoLocationData(data);
      })
      .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-[#F2EFE9] m-auto overflow-hidden">
      <Suspense fallback={<LoadingSpinner />}>
        <Header
          geoLocationData={geoLocationData}
          setGeoLocationData={setGeoLocationData}
        />
        <Map lat={geoLocationData?.latitude} lng={geoLocationData?.longitude}></Map>
      </Suspense>
    </div>
  );
}

export default App;
