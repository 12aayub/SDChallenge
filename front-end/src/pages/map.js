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
		center: { lat: 32.709630, lng: -117.158014 },
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={props.center}
  >
    {props.isMarkerShown && <Marker position={{ lat: 32.709630, lng: -117.158014 }} onClick={props.onMarkerClick} />}
		{props.isMarkerShown && <Marker position={{ lat: 32.715405, lng: -117.164008 }} onClick={props.onMarkerClick} />}
		<InfoBox
	       defaultPosition={new google.maps.LatLng(props.center.lat, props.center.lng)}
	       options={{ closeBoxURL: ``, enableEventPropagation: true }}
				 show={props.isInfoBoxShown}
	     >
	       <div style={{ backgroundColor: `white`, opacity: 0.75, padding: `12px` }}>
					 <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
	           Lets try this infobox
	         </div>
	       </div>
	     </InfoBox>
	</GoogleMap>
)


class Map extends Component {
	state = {
    isMarkerShown: false,
		isInfoBoxShown: false,
  }

  componentDidMount() {
    this.setState({ isMarkerShown: true })
  }



  handleMarkerClick = () => {
    this.setState({ isInfoBoxShown: true})
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
