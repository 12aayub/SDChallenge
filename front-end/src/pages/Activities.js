import React, { Component } from 'react';
import {Modal, ListGroup, ListGroupItem} from 'react-bootstrap';


class Activities extends Component {

  constructor(props){
    super(props);
    this.state = {
      showModal:false,
      currentActivity: null
    }
  }

  close() {
    this.setState({ showModal: false });
  }

  open(activity) {
    this.setState({
      showModal: true,
      currentActivity: activity
    });
  }


  modal() {
    if(this.state.currentActivity){
      const theModal = (
        <Modal show={this.state.showModal}
        onHide={this.close.bind(this)}
        >
          <Modal.Header>
            <Modal.Title>{this.state.currentActivity.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.state.currentActivity.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.close.bind(this)} >Close</button>
          </Modal.Footer>
        </Modal>
      )
      return theModal
    } else {
      return <div></div>
    }
  }

  render() {

    return (
      <ListGroup>
        {this.props.activities.map((activity) =>{
          return (
            <ListGroupItem key = {activity.id}>
              <button className = "activity" onClick={this.open.bind(this, activity)}>
                {activity.name}
              </button>
              {this.modal()}
            </ListGroupItem>
          )
        })}
      </ListGroup>
    );
    }
};

export default Activities;
