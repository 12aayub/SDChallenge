

import React, { Component } from 'react';

//Activities List
class Activities extends Component {

  constructor(props){
    super(props)
    this.state = {
      activities: [
        {
          id: 1,
          name: 'Museum',
          description: 'Visit the Art Museum at Balboa Park. Take a picture of yourself in front of your favorite piece of art.',
          points: 25

        },
        {
          id: 2,
          name: 'Mission Beach',
          description: 'Take a walk on the boardwalk. Get a picture of yourself in front of the rollercoaster.',
          points: 45

        },
        {
          id: 3,
          name: 'Hillcrest Farmer\'s Market',
          description: 'Visit the Hillcrest Farmer\'s Market on Sunday. Take a pictue in front of your favorite vendor.',
          points: 44

        }
      ]
    }
  }

  render() {
    //map activities array

    return (
      <div>
        {this.state.activities.map((activity, index) =>
          {
            return (
                <p key={index}>
                  <div><ul><strong>{activity.name}</strong>
                    <div><li>{activity.description}</li></div>
                    <div><li>{activity.points} points</li></div>
                    <div><li><input type='checkbox' name='completed' value='true'/>Completed?</li></div>
                  </ul></div>
                </p>
            )
          }
        )}
      </div>
    );
  }
}

        export default Activities;
