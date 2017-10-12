import React, { Component } from 'react';
import {
  Grid,
  PageHeader
} from 'react-bootstrap'
import ActivitiesAndMap from './pages/ActivitiesAndMap'
import NewActivity from './pages/newActivity'
import NavBar from './pages/Navbar'
import styles from './App.css'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
			activities: [
				{
					id: 1,
					name: 'The Art Museum at Balboa Park',
					address: '2412 J street',
					description: 'Visit the Art Museum at Balboa Park.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
				},
        {
					id: 4,
					name: 'Costco in Mission Valley',
					address: '19283 K street',
					description: 'Coo Coo.',
					points: 2,
					latitude: 32.78209099999999,
					longitude: -117.12873669999999
				},
        {
          id: 5,
          name: 'The Public Market at Liberty Station',
          address: '19283 B street',
          description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          points: 35,
          latitude: 32.7400605,
          longitude: -117.21101980000003
        },
        {
          id: 6,
          name: 'The Shout!House in Downtown San Diego',
          address: '19283 B street',
          description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          points: 17,
          latitude: 32.7120936,
          longitude: -117.16088960000002
        },
        {
          id: 7,
          name: 'Baked Bear in Pacific Beach',
          address: '19283 B street',
          description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          points: 20,
          latitude: 32.7967609,
          longitude: -117.25579649999997
        }
			]
		}
	}

	render() {
		return (
      <div className = "App">
        <video id="background-video" loop autoPlay>
          <source src='../Sunset-Siesta.mp4' type="video/mp4" />
          <source src='../Sunset-Siesta.mp4' type="video/ogg" />
        </video>
        <NavBar/>
			  <Grid>
          <PageHeader>
  					<h1>THE SAN DIEGO CHALLENGE</h1>
				  </PageHeader>
				  <ActivitiesAndMap activities={this.state.activities}/>
			  </Grid>
      </div>
		);
	}
}

export default App;
