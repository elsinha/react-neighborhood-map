import React, { Component } from 'react';
import './App.css';
import Map from "./Map";
import axios from 'axios';


class App extends Component {

state = {
  venues:[]

}

componentDidMount() {
  this.findVenues()

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
       this.setState({
        venues: response.data.response.groups[0].items
      } )
     })
     .catch(er => {
      console.log("was thrown error: " + er)
     })
  }

  render() {
    return (
      <div className="App">
        <Map {...this.state}/>
      </div>
    );
  }
}


export default App;
