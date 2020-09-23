import React from "react";
import { Map as OMap, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";

const Map = (props) => {
  return (
    <OMap
      center={[props.position.lat, props.position.lon]}
      zoom={props.zoom}
      bounds={props.position.bounds}
      dragging="false"
      doubleClickZoom="false"
      touchZoom="false"
      boxZoom="false"
      onmoveend={props.change}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.results.map((r) => {
        return (
          <Marker position={[r.lat, r.lon]} key={r.id}>
            <Popup>{r.tags.name}</Popup>
          </Marker>
        );
      })}
    </OMap>
  );
};

export default Map;
