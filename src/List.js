import React, { Component } from 'react';



class List extends Component {

  render() {
    return <div>
          <ul>
            {this.props.listMarkers.filter(marker => marker.isVisible).map((marker, index)=>
              <li className="list" key={index}>
              <button key={marker.id}
               onClick={()=> this.props.windowClickOneMarker(marker)}>
               {marker.name}
               </button>
              </li>
            )}
            </ul>
          </div>
  }
}


export default List;
