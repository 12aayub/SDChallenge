import React, { Component } from 'react';
// import { Modal, ListGroup, ListGroupItem } from 'react-bootstrap';

class Leaderboard extends Component {
  render() {
    return (
      <div className="leaderboard">
        <h3>LEADERBOARD:
          <ol>
            {this.props.leaderboard.map((ranking) =>{
              return (
                <li key = {ranking.userID}>
                  <h4>{ranking.Username}: {ranking.totalPoints} Points</h4>
                </li>
              )
            })}
          </ol>
        </h3>
      </div>
    )
  }
}

export default Leaderboard
