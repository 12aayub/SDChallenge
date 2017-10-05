/* eslint-disable no-undef */
import React, { Component } from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import InfoBox from "react-google-maps/lib/components/addons/InfoBox"

const MyMapComponent = compose(
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
    	props.isMarkerShown && <Marker position={{ lat: activity.latitude, lng: activity.longitude }} onClick={props.onMarkerClick} />
		)})}
	</GoogleMap>
)


class Map extends Component {
	constructor(props){
		super(props)
		this.state = {
	    isMarkerShown: false,
	    showModal:false,
	    currentActivity: null,
			activities: this.props.activities
	  }}

	close() {
    this.setState({ showModal: false });
  }

	handleMarkerClick (activity) {
		this.setState({
			showModal: true,
			currentActivity: activity
		});
	}

  render() {
    return (
			<div>
					<MyMapComponent
		        isMarkerShown={this.state.isMarkerShown}
		        onMarkerClick={this.handleMarkerClick}
						activities={this.state.activities}
		      />
		</div>
    );
  }

	componentDidMount() {
		this.setState({ isMarkerShown: true })
	}

}

export default Map;
