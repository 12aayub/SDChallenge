import React, { Component } from 'react';
import {
  Button,
  Col,
  ControlLabel,
  FormGroup,
  FormControl,
  Row,
  Grid,
  PageHeader,
  Alert,
  HelpBlock
} from 'react-bootstrap'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      form:{
        email: '',
        password: ''
      }
    }
  }

  handleChange(event){
    const formState = Object.assign({}, this.state.form)
    formState[event.target.name] = event.target.value
    this.setState({form: formState})
  }

  handleSubmit(event){
    event.preventDefault(event)
    this.props.onSubmit(this.state.form)
  }

  errorsFor(attribute){
    var errorString = ""
    if(this.props.errors){
      const errors = this.props.errors.filter(error => error.param === attribute )
      if(errors){
        errorString = errors.map(error => error.msg ).join(", ")
      }
    }
    return errorString === "" ? null : errorString
  }

  render(){
    return (
      <Grid className = "loginForm">
        <PageHeader>
          <Row>
            <Col xs={12}>
              Log In
            </Col>
          </Row>
        </PageHeader>

          <form >
              <Row>
                <Col xs={12}>
                  <FormGroup >
                    <ControlLabel id="email">Email</ControlLabel>
                    <FormControl
                      name="email"
                      value={this.state.form.email}
                      onChange={this.handleChange.bind(this)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <FormGroup >
                    <ControlLabel id="password">Password</ControlLabel>
                    <FormControl
                      name="password"
                      type="password"
                      value={this.state.form.password}
                      onChange={this.handleChange.bind(this)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Button
                    onClick={this.handleSubmit.bind(this)}
                  id="submit" type="submit">Log In</Button>
                </Col>
              </Row>
          </form>
      </Grid>

    )
  }
}


export default Login
