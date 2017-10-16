import React, { Component } from 'react'
import { Modal, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { handleUserLogout } from '../actions/UserActions'
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
      <Marker key={activity.Activity.id} position={{ lat: activity.Activity.latitude, lng: activity.Activity.longitude }} onClick={props.onMarkerClick.bind(this, activity.Activity)} />
    )})}
  </GoogleMap>
)

class CompletedActivities extends Component {

  handleLogout(){
    this.props.onSubmit(handleUserLogout)
      }

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
        <h3>Congrats on completing these challenges!</h3>
        <h2>Your total points: {this.props.userPoints}</h2>
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
                    <p>Description: {index.Activity.description}</p>
                    <p>Address: {index.Activity.address}</p>
                    <p>Points: {index.Activity.points}</p>
                    <p>Completed At: {
                      new Date(index.completedAt).getMonth() + 1 + '-' + new Date(index.completedAt).getDate() + '-' + new Date(index.completedAt).getFullYear()
                    }
                    </p>
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
        <Modal className = "modal" show={this.state.showModal}
        onHide={this.close.bind(this)}
        >
          <Modal.Header>
            <Modal.Title>
              <img id = "locationIcon" src = '../locationIcon.png' alt = 'locationIcon'/>
              {this.state.currentActivity.name.toUpperCase()}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>POINTS: {this.state.currentActivity.points}</h5>
            <h5>{this.state.currentActivity.description}</h5>

          </Modal.Body>
          <Modal.Footer>
            <div id = "modalAddress"><p>{this.state.currentActivity.address} </p></div>
            <button id = "closeButton" onClick={this.close.bind(this)}>CLOSE</button>
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
