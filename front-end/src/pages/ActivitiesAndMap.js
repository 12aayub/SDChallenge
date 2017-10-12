import React, { Component } from 'react';
import { Modal, ListGroup, ListGroupItem } from 'react-bootstrap';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCnSa0UV1EelPqTT2Uo3CyxSfnkDIcTwaA",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, padding: `20px`}} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 32.722752, lng: -117.168310 }
  }),
    withScriptjs,
    withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={props.center}
  >
    { props.activities.map((activity) =>{
    return (
      <Marker key={activity.id} position={{ lat: activity.latitude, lng: activity.longitude }} onClick={props.onMarkerClick.bind(this, activity)} />
    )})}
  </GoogleMap>
)



class ActivitiesAndMap extends Component {

  constructor(props){
    super(props);
    this.state = {
      showModal:false,
      isMarkerShown: true,
      currentActivity: null
    }
  }

  render() {
    return (
      <div>
        <MapComponent
        onMarkerClick={this.open.bind(this)}
        activities={this.props.activities}
        />
        <ListGroup>
          {this.props.activities.map((activity) =>{
            return (
              <ListGroupItem key = {activity.id}>
                <button className = "activity" onClick={this.open.bind(this, activity)}>
                  {activity.name}
                </button>
                {this.modal()}
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    );
  }

  close() {
    this.setState({ showModal: false });
  }

  open(activity) {
    this.setState({
      showModal: true,
      currentActivity: activity
    });
  }

  complete(activity) {
    this.setState({ showModal: false })
    this.props.handleComplete(activity.id)
  }

  modal() {
    if(this.state.currentActivity){
      const theModal = (
        <Modal show={this.state.showModal}
        onHide={this.close.bind(this)}
        >
          <Modal.Header>
            <Modal.Title>{this.state.currentActivity.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.state.currentActivity.description}</p>
            <hr/>
            <h4>Longitude: {this.state.currentActivity.longitude}</h4>
            <h4>Latitude: {this.state.currentActivity.latitude}</h4>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.close.bind(this)}>Close</button>
            <button onClick={this.complete.bind(this, this.state.currentActivity)}>Complete</button>
          </Modal.Footer>
        </Modal>
        )
      return theModal
    } else {
      return <div></div>
    }
  }

// findIncomplete (array1, array2) {
//     var incomplete = [];
//     for(var i in array1) {
//       if(array2.indexOf( array1[i].id ) > -1){
//         incomplete.push( array1[i] )
//         console.log(array1[i])
//       }
//     }
//     return incomplete;
//   };

};

export default ActivitiesAndMap;
