import React, { Component } from 'react';
import {
  Grid,
  PageHeader
} from 'react-bootstrap'
import Activities from './pages/Activities'
import Map from './pages/map'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
			activities: [
				{
					id: 1,
					name: 'Museum',
					address: '2412 J street',
					description: 'Visit the Art Museum at Balboa Park.',
					points: 25,
					latitude: 32.709536,
					longitude: -117.158021
				},
				{
					id: 2,
					name: 'Mission Beach',
					address: '2131 L street',
					description: 'Take a walk on the boardwalk. Get a picture of yourself in front of the rollercoaster.',
					points: 45,
					latitude: 32.735073,
					longitude: -117.148412
				},
				{
					id: 3,
					name: 'Hillcrest Farmer\'s Market',
					address: '19283 B street',
					description: 'Visit the Hillcrest Farmer\'s Market on Sunday. Take a pictue in front of your favorite vendor.',
					points: 44,
					latitude: 32.722752,
					longitude: -117.168310
				}
			]
    }
  }

  render() {
    return (
      <Grid>
        <PageHeader>
		<div>
          <h1>THE SAN DIEGO CHALLENGE (tm)</h1>
		</div>
        </PageHeader>
				<Map activities={this.state.activities}/>
        <Activities activities={this.state.activities}/>
      </Grid>
    );
  }
}

export default App;
