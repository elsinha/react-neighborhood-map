import React, { Component } from 'react';
import './App.css';
import Map from "./Map";
import axios from 'axios';


class App extends Component {

state = {
  venues:[],
  listMarkers:[]
}

componentDidMount() {
  this.findVenues()

}
windowClickInfoMarker = marker => {
  let markers = this.state.listMarkers;
markers.forEach(m=>{
  if(m.id === marker.id){
        m.isWindowOpen = true;
      }
  else if(m.isWindowOpen){
      m.isWindowOpen = false;
    }
  });

  this.setState({listMarkers : markers});

}
  // adding api from foursquare
  findVenues = () => {
    const destination = "https://api.foursquare.com/v2/venues/explore?"
    const param = {
      client_id: "",
      client_secret: "",
      query: "scenic",
      near: "Las Vegas",
      v: "20181103"
    }

    axios.get(destination + new URLSearchParams(param))
    .then(response => {

      this.setState({venues: response.data.response.groups[0].items});
      const listMarkers = this.state.venues.map(venue => {
        return {
        id: venue.venue.id,
        lat: venue.venue.location.lat,
        lng: venue.venue.location.lng,
        name: venue.venue.name,
        address: venue.venue.location.address,
        isWindowOpen: false
        }
      });
      this.setState({listMarkers: listMarkers});
     })
     .catch(er => {
      console.log("was thrown error: " + er)
     })
  }

  render() {
    return (
      <div className="App">
        <Map {...this.state} windowClickInfoMarker={this.windowClickInfoMarker}/>
      </div>
    );
  }
}

export default App;
