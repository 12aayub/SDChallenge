import React, { Component } from 'react';
import {
  Col,
  ControlLabel,
  FormGroup,
  FormControl,
  Row,
  Button
  // Alert,
  // HelpBlock
} from 'react-bootstrap'

class NewActivity extends Component {
  constructor(props){
    super(props)
    this.state = {
      form:{
        name: '',
        description:'',
        address: '',
        latitude:'',
        longitude:''
      }
    }
  }

  handleChange(event){
    const formState = Object.assign({}, this.state.form)
    formState[event.target.name] = event.target.value
    this.setState({form: formState})
  }

  handleSubmit(){
    this.props.onSubmit(this.state.form)
    this.setState({form:{ name: '', description:'', address: '', latitude:'', longitude:''}})
    document.getElementById("submitMessage").innerText = "Activity Submitted"
    setTimeout(function(){document.getElementById("submitMessage").innerText = ""}, 2000)
  }

  render() {
    return (
      <form className = "loginForm">
        <h3> Add a new activity </h3>
        <Row>
          <Col xs={12}>
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl type="text" name="name"
              onChange={this.handleChange.bind(this)}
              value={this.state.form.name}/>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl type="text" name="description"
              onChange={this.handleChange.bind(this)}
              value={this.state.form.description}/>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <FormGroup>
              <ControlLabel>Address</ControlLabel>
              <FormControl type="text" name="address"
              onChange={this.handleChange.bind(this)}
              value={this.state.form.address}/>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <FormGroup>
              <ControlLabel>Latitude</ControlLabel>
              <FormControl type="text" name="latitude"
              onChange={this.handleChange.bind(this)}
              value={this.state.form.latitude}/>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <FormGroup>
              <ControlLabel>Longitude</ControlLabel>
              <FormControl type="text" name="longitude"
              onChange={this.handleChange.bind(this)}
              value={this.state.form.longitude}/>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs= {12}>
            <Button id="submit"
            onClick={this.handleSubmit.bind(this)}> Create New Activity</Button>
          </Col>
        </Row>
        <div id="submitMessage"></div>
      </form>

    )
  }
}

export default NewActivity
