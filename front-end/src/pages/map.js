
import React, { Component } from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, padding: `20px`}} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 32.709630, lng: -117.158014 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 32.709630, lng: -117.158014 }} onClick={props.onMarkerClick} />}
		{props.isMarkerShown && <Marker position={{ lat: 32.715405, lng: -117.164008 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)


class Map extends Component {
	state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }
  render() {
    return (
			<div>
					<MyMapComponent
		        isMarkerShown={this.state.isMarkerShown}
		        onMarkerClick={this.handleMarkerClick}
		      />
		</div>
    );
  }
}

export default Map;
