import React, { Component } from 'react';
import {Modal, ListGroup, ListGroupItem} from 'react-bootstrap';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
const MapStyles = require("./MapStyles.json")

const MapComponent = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
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
			activities: this.props.activities
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
				<div id = "challengesSection">
					<h4 id = "challengesTitle">CHALLENGES</h4>
					<ListGroup className = "activityList">
						{this.props.activities.map((activity) =>{
							return (
								<ListGroupItem key = {activity.id} className = "activity">
									<button className = "activityTitle" onClick={this.open.bind(this, activity)}>
										{activity.name}
									</button>
									{this.modal()}
								</ListGroupItem>
							)
						})}
					</ListGroup>
				</div>
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
						<h4>{this.state.currentActivity.address}</h4>
						<p>{this.state.currentActivity.description}</p>
					</Modal.Body>
					<Modal.Footer>
						<h4 id = "modalPoints">POINTS: {this.state.currentActivity.points} </h4>
						<button id = "completedButton" >COMPLETED  <span className="glyphicon glyphicon-check"></span></button>
						<button id = "closeButton" onClick={this.close.bind(this)} >CLOSE</button>
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
