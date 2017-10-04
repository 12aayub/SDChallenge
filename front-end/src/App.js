import React, { Component } from 'react';
import {
  Grid,
  PageHeader
} from 'react-bootstrap'
import Activities from './pages/Activities.js'



class App extends Component {
  constructor(props){
    super(props);
    this.handleCompletedActivity = this.handleCompletedActivity.bind(this);
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
      user: [
        {
          id: 0,
          name: 'bob'
          email: 'bob@bob.com',
          activitiesCompleted: '[0,1,2]',
          totalPoints: 250
        },
        {
          id: 1,
          name: 'jim'
          email: 'jim@jim.com',
          activitiesCompleted: '[0,3,2]',
          totalPoints: 50
        },
      }
    ]
  }

  render() {
    return (
      <Grid>
        <PageHeader>
          <h1>THE SAN DIEGO CHALLENGE (tm)</h1>
        </PageHeader>
        <Activities activities={this.state.activities}/>
      </Grid>
    );
  }
}

export default App;
