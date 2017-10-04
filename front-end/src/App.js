import React, { Component } from 'react';
import {
  Grid,
  PageHeader
} from 'react-bootstrap'
import Activities from './pages/Activities.js'



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activities: [
        {
          id: 1,
          name: 'Museum',
          address: '2412 J street',
          description: 'Visit the Art Museum at Balboa Park. Take a picture of yourself in front of your favorite piece of art.',
          points: 25

        },
        {
          id: 2,
          name: 'Mission Beach',
          address: '2131 L street',
          description: 'Take a walk on the boardwalk. Get a picture of yourself in front of the rollercoaster.',
          points: 45

        },
        {
          id: 3,
          name: 'Hillcrest Farmer\'s Market',
          address: '19283 B street',
          description: 'Visit the Hillcrest Farmer\'s Market on Sunday. Take a pictue in front of your favorite vendor.',
          points: 44

        }
      ]
    }
  }

  render() {
    return (
      <Grid>
        <PageHeader>
          <h1>THE SAN DIEGO CHALLENGE (tm)</h1>
        </PageHeader>
        <ActivityModal activities={this.state.activities}/>
      </Grid>
    );
  }
}

export default App;
