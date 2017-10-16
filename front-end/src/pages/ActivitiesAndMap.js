import React, { Component } from 'react';
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
    defaultZoom={10}
    defaultCenter={props.center}
    defaultOptions={{ styles:MapStyles }}
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
      showModal2:false,
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
        <div id = "challengesSection">
          <h4 id = "challengesTitle">CHALLENGES</h4>
          <ListGroup className = "activityList">
            {this.props.activities.map((activity) =>{
              return (
              <ListGroupItem key = {activity.id} className = "activity">
                <button className = "activityTitle" onClick={this.open.bind(this, activity)}>
                  {activity.name}
                </button>
              </ListGroupItem>
              )
            })}
            {this.modal2()}
            {this.modal()}
          </ListGroup>
        </div>
      </div>
    );
  }

  close() {
    this.setState({ showModal: false });
  }

  close2() {
    this.setState({ showModal2: false });
  }

  open(activity) {
    this.setState({
      showModal: true,
      currentActivity: activity
    });
  }

  open2() {
    this.setState({
      showModal2: true
    });
  }

  complete(activity) {
    let self = this
    //changing the button text doesn't work yet :( so sad
    document.getElementById("completeButton").innerText = "Locating..."
    window.navigator.geolocation.getCurrentPosition(function(pos){
      var R = 6371
      var dLat = (activity.latitude-pos.coords.latitude)
      var dLon = (activity.longitude-pos.coords.longitude)
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(pos.coords.latitude) * Math.cos(activity.latitude) *
              Math.sin(dLon/2) * Math.sin(dLon/2)
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
      var d = R * c
      if( d < 100 ){
        self.props.handleComplete(activity)
        self.setState({ showModal: false })
        self.setState({ showModal2: true })
        document.getElementById("headerstyle").style.backgroundColor = '#8fdf8d'
        setTimeout(function(){self.setState({ showModal2: false }) }, 3000);
        // alert("Congrats on completing an activity! Keep it up!")
        document.getElementById("completeButton").innerText = "Complete"
      } else {
        self.setState({ showModal: false })
        self.setState({ showModal2: true })
        document.getElementById("headerstyle").style.backgroundColor = '#ff6666'
        document.getElementById("greeting").innerText = "Get closer!"
        document.getElementById("message").innerText = "You are outside of the activity's location."
        setTimeout(function(){self.setState({ showModal2: false }) }, 3000);
        // alert("You are outside of the activity's location. Get closer!")
        document.getElementById("completeButton").innerText = "Complete"
      }
    })
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
            <h4>POINTS: {this.state.currentActivity.points}</h4>
            <h5>{this.state.currentActivity.description}</h5>

          </Modal.Body>
          <Modal.Footer>
            <div id = "modalAddress"><p>{this.state.currentActivity.address} </p></div>
            { this.props.user &&
              <button id = "completeButton" onClick={this.complete.bind(this, this.state.currentActivity)}>COMPLETE <span className="glyphicon glyphicon-check"></span></button>
            }
            { (!this.props.user) &&
              <a href="/signup"><button id = "completeButton">SIGN UP</button></a>
            }
            <button id = "closeButton" onClick={this.close.bind(this)}>CLOSE</button>
          </Modal.Footer>
        </Modal>
      )
      return theModal
    } else {
      return <div></div>
    }
  }

  modal2() {
    const theModal2 = (
      <Modal className = "modal2" show={this.state.showModal2}
      onHide={this.close2.bind(this)}
      >
        <Modal.Header id="headerstyle">
          <Modal.Title id="greeting">
            CONGRATS!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
           <h5 id="message">You completed a challenge! Keep it up!</h5>
        </Modal.Body>
      </Modal>
    )
    return theModal2
  }
};

export default ActivitiesAndMap;
