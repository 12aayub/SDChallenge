import React, { Component } from 'react';
import { Modal, ListGroup, ListGroupItem } from 'react-bootstrap';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, padding: `20px`}} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 32.722752, lng: -117.168310 },
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
      <Marker position={{ lat: activity.latitude, lng: activity.longitude }} onClick={props.onMarkerClick.bind(this, activity)} />
    )})}
  </GoogleMap>
)


class ActivitiesAndMap extends Component {

  constructor(props){
    super(props);
    this.state = {
      showModal:false,
      currentActivity: null,
      activities: this.props.activities,
      completedActivities: this.props.completedActivities,
      userID: this.props.userID
    }
  }

  render() {
    return (
      <div>
        <MapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.open.bind(this)}
        activities={this.state.activities}
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
    //if activity matches any id's in completedActivities, then set completed button to "don't show"
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
          <h4>{this.state.currentActivity.address}</h4>
          <p>{this.state.currentActivity.description}</p>
          <hr/>
          <h4>Points:{this.state.currentActivity.points}</h4>
            </Modal.Body>
          <Modal.Footer>
            <button onClick={this.close.bind(this)}>Close</button>
            //if currentActivity matches any id's in completedActivities, then show:
            <button onClick={this.close.bind(this)}>Complete</button>
          </Modal.Footer>
        </Modal>
        )
      return theModal
      } else {
        return <div></div>
    }
  }
};

export default ActivitiesAndMap;
