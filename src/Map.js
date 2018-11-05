import React, {Component} from "react";
import './App.js';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"

const locations =[
  {
    name: "Valley of Fire",
    lat: 36.4855,
    lng:  -114.5313,
    id: "4e3ae50462e10c0843dbf79d"
  },
  {
    name: "Mt. Charleston",
    lat: 36.2572,
    lng:  -115.6428,
    id: "4d165cb88312236a635d57ba"
  },
  {
    name: "Red Rock Scenic Drive",
    lat: 36.1979,
    lng:  -115.4563,
    id:"4b3a7a91f964a5203b6825e3"
  },
  {
    name: "Vegas Sign",
    lat: 36.119925142713015,
    lng: -115.16406889453914,
    id: "50396790e4b08256fb44585a"
  },
  {
    name:"Lakeside Center",
    lat: 36.20791685766454,
    lng: -115.26846928569219,
    id: "4bc892d16501c9b64e604029"
  }

];



const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={9}
    defaultCenter={{ lat: 36.114647, lng:  -115.172813 }}>

    {props.listMarkers && props.listMarkers.map((marker, index) => (
             <Marker key={index} onClick={()=> props.windowClickInfoMarker(marker)} position={{lat:marker.lat, lng:marker.lng}} title={marker.name} animation={window.google.maps.Animation.DROP}>
             {marker.isWindowOpen && (
             <InfoWindow>
               <div>
                <p> {marker.address}</p>
                <p>{marker.name}</p>
                </div>
              </InfoWindow>
            )}
             </Marker>

          ))}
  </GoogleMap>
));


export default class Map extends Component {
  render() {
    return(
      <MyMapComponent
        {...this.props}
        googleMapURL=""
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
