import React, {Component} from "react";
import './App.js';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={9}
    defaultCenter={{ lat: 36.114647, lng:  -115.172813 }}>

    {props.listMarkers && props.listMarkers.filter(marker => marker.isVisible).map((marker, index) => (
             <Marker key={index} onClick={()=> props.windowClickInfoMarker(marker)}
             position={{lat:marker.lat, lng:marker.lng}} title={marker.name}
              animation={window.google.maps.Animation.DROP}>
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
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=YOUR-KEY"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
