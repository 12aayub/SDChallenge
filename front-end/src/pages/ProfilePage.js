import React, { Component } from 'react'
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
    { props.activities.map((index) =>{
    return (
      <Marker key={index.Activity.id} position={{ lat: index.Activity.latitude, lng: index.Activity.longitude }} onClick={props.onMarkerClick.bind(this, index.Activity)} />
    )})}
  </GoogleMap>
)

class CompletedActivities extends Component {

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
        <h3>Here are your completed activities.</h3>
        <MapComponent
        onMarkerClick={this.open.bind(this)}
        activities={this.props.completedActivities}
        />
        <ListGroup>

        {this.props.completedActivities.map((index) =>{
          return (
              <ListGroupItem key = {index.Activity.id}>
                <div>
                  <p>Activity: {index.Activity.name}</p>
                  <p>Completed At: {index.completedAt}</p>
                  <p>Description: {index.Activity.description}</p>
                  <p>Latitude: {index.Activity.latitude}</p>
                  <p>Longitude: {index.Activity.longitude}</p>
                </div>
              </ListGroupItem>
            )
        })}
        {this.modal()}
        </ListGroup>
      </div>
    )
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
          </Modal.Footer>
        </Modal>
        )
      return theModal
    } else {
      return <div></div>
    }
  }

}

export default CompletedActivities;
