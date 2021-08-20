import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

function MyComponent({ position }) {
  const map = useMap();
  map.flyTo(position);
  return null;
}

const Map = ({ lat, lng }) => {
  const position = [lat, lng];

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
      <MyComponent position={position}></MyComponent>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
