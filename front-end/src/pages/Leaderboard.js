import React, { Component } from 'react';
// import { Modal, ListGroup, ListGroupItem } from 'react-bootstrap';

class Leaderboard extends Component {
  render() {
    return (
      <div className ="boardContainer">
        <img className="wreath" src="../wreath_left.png" alt="wreath_left"/>
        <div className="leaderboard">
          <h2 id="boardTitle">LEADERBOARD:  </h2>
            <ol>
              {this.props.leaderboard.map((ranking) =>{
                return (
                  <li key = {ranking.userID}>
                    <h4>{ranking.Username}: {ranking.totalPoints} Points</h4>
                  </li>
                )
              })}
            </ol>
        </div>
        <img className="wreath" src="../wreath_right.png" alt="wreath_right"/>
      </div>
    )
  }
}

export default Leaderboard
