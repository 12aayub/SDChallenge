import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';


class ActivityModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      showModal:false
    }
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  modal() {
    const theModal = (
      <Modal show={this.state.showModal}
      onHide={this.close.bind(this)}
      >
        <Modal.Header>
          <Modal.Title>1. The Cave of Aaron</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>704 J Street, Downtown San Diego</h4>


          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <hr />
          <h4>Points: </h4>

        </Modal.Body>
        <Modal.Footer>
          <button
          onClick={this.close.bind(this)}
          >Close</button>
        </Modal.Footer>
      </Modal>
    )
    return theModal
  }

  render() {

    return (
      <div>

        <button className = "activity"
          onClick={this.open.bind(this)}
        >
          The Cave of Aaron
        </button>
        { this.modal() }
      </div>
    );
  }
};

export default ActivityModal;
