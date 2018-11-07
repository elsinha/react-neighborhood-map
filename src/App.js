import React, { Component } from 'react';
import './App.css';
import List from "./List";
import Map from "./Map";
import axios from 'axios';
import { Navbar, FormGroup } from 'react-bootstrap';


class App extends Component {

state = {
  venues:[],
  listMarkers:[],
  query:""
}

componentDidMount() {
  this.findVenues()

}
changeQueryValue=(query)=>{
        this.setState({query: query});
        setTimeout(this.search, 250);;
      }

search =() =>{
  if(this.state.query !==""){
    //const destination = "https://api.foursquare.com/v2/venues/search?"
    const markers =this.state.venues.map(venue => {
      const isFilter = venue.venue.name.toLowerCase().includes(this.state.query.toLowerCase());
      const marker = this.state.listMarkers.find(marker => marker.id === venue.venue.id);
      if(isFilter){
        marker.isVisible = true;
      }
      else{
        marker.isVisible = false;
      }
      return marker;
    });

  }
  else{
    this.findVenues();
  }
}

windowClickOneMarker = marker =>{
  console.log("marker"+marker);
  let markers = this.state.listMarkers;
markers.forEach(m=>{
  if(m.id === marker.id){
        m.isVisible = true;
      }
  else{
      m.isVisible = false;
    }
  });

  this.setState({listMarkers : markers});
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
      client_id: "JG2CPO53DQPBGCXP4UIWSW3T2OZ53MTLALRTFEOXZLTGJLYT",
      client_secret: "G4OWTPIVJ0AB4FUELTIFVYWSMQQG2E3RU4LGRCPFJVZSDBXP",
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
        isWindowOpen: false,
        isVisible:true
        }
      });
      this.setState({listMarkers: listMarkers});
     })
     .catch(er => {
      alert("was thrown error: " + er);
     })
  }

  render() {
    return (
      <div className="App" aria-label="application">
        <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <p>Scenic Las Vegas</p>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <input type="text" placeholder="Filter..." name="filter" aria-label="Search input"
              onChange={(e) => this.changeQueryValue(e.target.value)}
             value={this.state.query} />
           <List {...this.state} windowClickOneMarker={this.windowClickOneMarker}/>
            </FormGroup>{' '}

          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
        <Map {...this.state} windowClickInfoMarker={this.windowClickInfoMarker}/>
      </div>
    );
  }
}

export default App;
