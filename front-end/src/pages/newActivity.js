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
import { createNewActivity } from '../actions/ActivitiesActions'

class NewActivity extends Component {
  constructor(props){
    super(props)
    this.state = {
      form:{
        name: '',
        description:'',
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
  }

  render() {
    return (
      <form>
        <h3> Add a new activity </h3>
        <Row>
          <Col xs={6}>
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl type="text" name="name"
              onChange={this.handleChange.bind(this)}
              value={this.state.form.name}/>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl type="text" name="description"
              onChange={this.handleChange.bind(this)}
              value={this.state.form.description}/>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <FormGroup>
              <ControlLabel>Latitude</ControlLabel>
              <FormControl type="text" name="latitude"
              onChange={this.handleChange.bind(this)}
              value={this.state.form.latitude}/>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <FormGroup>
              <ControlLabel>Longitude</ControlLabel>
              <FormControl type="text" name="longitude"
              onChange={this.handleChange.bind(this)}
              value={this.state.form.longitude}/>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs= {6}>
            <Button id="submit"
            onClick={this.handleSubmit.bind(this)}> Create New Activity</Button>
          </Col>
        </Row>
      </form>

    )
  }
}

export default NewActivity
