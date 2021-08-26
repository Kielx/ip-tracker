import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import LoadingSpinner from "./LoadingSpinner";

function MyComponent({ position }) {
  const map = useMap();
  map.flyTo(position);
  return null;
}

const Map = ({ lat, lng }) => {
  if (!lat || !lng) {
    return <LoadingSpinner />;
  }

  const position = [lat, lng];

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: "100%",
        width: "100%",
        zIndex: 0,
      }}
    >
      <MyComponent position={position}></MyComponent>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>You are here!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
