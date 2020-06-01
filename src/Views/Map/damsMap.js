import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import leaflet, { LatLngBounds } from "leaflet";
import { Map, TileLayer, Marker, Popup, GeoJSON  } from "react-leaflet";
import damPin from "../../Assets/mapPin.svg";
import pakistanLocation from "../../Utilities/Constants/pakistan-geolocation.json";

export const pointerIcon = new leaflet.Icon({
  iconUrl: damPin,
  iconAnchor: [5, 40],
  popupAnchor: [10, -44],
  iconSize: [24, 41],
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
});

const markers = [
  {
    key: "marker1",
    position: [34.0105, 71.9876],
    content: "Nowshera Dam",
    inflowData: "Inflow is 22.5",
    icon: pointerIcon
  },
  {
    key: "marker2",
    position: [32.6724, 74.4644],
    content: "Head Marala",
    inflowData: "Inflow is 13.4",
    icon: pointerIcon
  },
  {
    key: "marker3",
    position: [33.1406, 72.9564],
    content: "Kalabagh Dam",
    icon: pointerIcon
  },
  {
    key: "marker4",
    position: [33.1406, 73.6426],
    content: "Mangala Dam",
    inflowData: "Inflow is 23.8",
    icon: pointerIcon
  },
  {
    key: "marker5",
    position: [25.9424, 62.6932],
    content: "Mirani Dam",
    icon: pointerIcon
  },
  {
    key: "marker6",
    position: [33.7027, 73.1261],
    content: "Rawal Dam",
    icon: pointerIcon
  },
  {
    key: "marker7",
    position: [34.0875, 72.699],
    content: "Tarbela Dam",
    inflowData: "Inflow is 25",
    icon: pointerIcon
  },
  {
    key: "marker8",
    position: [34.164, 71.3585],
    content: "Warsak Dam",
    icon: pointerIcon
  }
];

const MyPopupMarker = ({ content, position, icon, inflowData }) => (
  <Marker position={position} icon={icon}>
    <Popup>
      <h3>{content}</h3>
      <b style={{ fontSize: "17px" }}>{inflowData}</b>
      <hr/>
      <Link to={"/charts/"+content}>See detailed Info...</Link>
    </Popup>
  </Marker>
);

const MyMarkersList = ({ markers }) => {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} />
  ));
  return <Fragment>{items}</Fragment>;
};

class DamsMap extends Component {
  constructor() {
    super();
    this.state = {
      zoom: 6
    };
  }

  render() {
    return (
      <div className='out-map'>
      <Map
        maxZoom={19}
        padding={200}
        animate={true}
        style={{ height: "100%" }}
        center={[30.3753, 69.3451]}
        zoom={this.state.zoom}
      >
      <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' 
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> 
        <GeoJSON
          data={pakistanLocation}
          style={() => ({
            color: "#FFFFF0",
            weight: 3,
            fillColor: "green",
            fillOpacity: 0.6,
            opacity: 1,
            
          })}
        />
        <MyMarkersList markers={markers} />
      </Map>
      </div>
    );
  }
}

export default DamsMap;
