import React, { Component } from 'react'


class CompletedActivities extends Component {
  render() {
    return (
      <div>
          <h1>Completed Activities</h1>
          <ol>
          {this.props.completedactivities.map((completedactivities, index) =>{
              return (
                  <li key={index}>
                          <div>
                            <p>Completed At:  {completedactivities.completedAt}</p>
                            <p>User:  {completedactivities.userID}</p>
                            <p>Activity:  {completedactivities.Activity.name}</p>
                          </div>
                  </li>
              )
          })}
          </ol>
      </div>
    )
  }
}

export default CompletedActivities;
