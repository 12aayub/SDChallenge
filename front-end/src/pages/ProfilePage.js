import React, { Component } from 'react'
import { Modal, ListGroup, ListGroupItem } from 'react-bootstrap';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
const MapStyles = require("./MapStyles.json")

const MapComponent = compose(
withProps({
  googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCnSa0UV1EelPqTT2Uo3CyxSfnkDIcTwaA",
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div className= "mapContainer" style={{ height: `400px`, width:`49%`, display:`inline-block`}} />,
  mapElement: <div style={{ height: `100%`}} />,
  center: { lat: 32.722752, lng: -117.168310 },
}),
withScriptjs,
withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={11}
    defaultCenter={props.center}
    defaultOptions={{ styles:MapStyles }}
  >
    { props.activities.map((activity) =>{
      return (
      <Marker key={activity.Activity.id} position={{ lat: activity.Activity.latitude, lng: activity.Activity.longitude }} onClick={props.onMarkerClick.bind(this, activity)} />
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
        <h3>Here are the challenges you have completed:</h3>
        <MapComponent
        onMarkerClick={this.open.bind(this)}
        activities={this.props.completedActivities}
        />
        <div id = "challengesSection">
          <h4 id = "challengesTitle">COMPLETED CHALLENGES</h4>
          <ListGroup className = "activityList">
          {this.props.completedActivities.map((index) =>{
            return (
                <ListGroupItem key = {index.Activity.id} className = "activity">
                  <div>
                    <p>Activity: {index.Activity.name}</p>
                    <p>Completed At: {
                      new Date(index.completedAt).getMonth() + 1 + '-' + new Date(index.completedAt).getDate() + '-' + new Date(index.completedAt).getFullYear()
                    }
                    </p>
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
