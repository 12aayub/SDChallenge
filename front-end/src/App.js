import React, { Component } from 'react';
import { Grid, PageHeader } from 'react-bootstrap'
import ActivitiesAndMap from './pages/ActivitiesAndMap'
import NewActivity from './pages/newActivity'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { addNewUser, checkLogin, handleUserLogin } from './actions/UserActions'
import { connect } from 'react-redux'

const mapComponentToProps = (store) =>{
  return {
    user: store.user.currentUser,
    userError: store.user.error
  }
}

export default connect(mapComponentToProps)(
  class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        user: null,
        apiUrl: "http://localhost:3000",
        newUserSuccess: false,
        activities: [
          {
            id: 1,
            name: 'Museum',
            address: '2412 J street',
            description: 'Visit the Art Museum at Balboa Park.',
            points: 25,
            latitude: 32.709536,
            longitude: -117.158021
          },
          {
            id: 2,
            name: 'Mission Beach',
            address: '2131 L street',
            description: 'Take a walk on the boardwalk. Get a picture of yourself in front of the rollercoaster.',
            points: 45,
            latitude: 32.735073,
            longitude: -117.148412
          },
          {
            id: 3,
            name: 'Hillcrest Farmer\'s Market',
            address: '19283 B street',
            description: 'Visit the Hillcrest Farmer\'s Market on Sunday. Take a pictue in front of your favorite vendor.',
            points: 44,
            latitude: 32.722752,
            longitude: -117.168310
          }
        ]
      }
    }

    handleNewUser(params){
      this.props.dispatch(addNewUser(this.state.apiUrl, params))
    }

    handleLogin(params){
      this.props.dispatch(handleUserLogin(this.state.apiUrl, params))
    }

    componentWillMount(){
        this.props.dispatch(checkLogin(this.state.apiUrl))
    }

    render() {
      return (
        <Router>
          <div>
            <Route exact path="/" render={props => (
              <Grid>
              <PageHeader>
              THE SAN DIEGO CHALLENGE (tm)
              </PageHeader>
              <p>{this.state.user}</p>
              {
                !this.props.user &&
                <Login onSubmit={this.handleLogin.bind(this)} />
              }
              { this.props.user &&
                <h2>Hello, {this.props.user.name}!</h2>
              }
              <ActivitiesAndMap activities={this.state.activities}/>
              <NewActivity />

              </Grid>
            )}/>

            <Route exact path="/signup" render={props => (
              <Grid>
                <Signup onSubmit={this.handleNewUser.bind(this)} />
                  {this.props.user &&
                    <Redirect to="/" />
                  }
              </Grid>
            )}/>
          </div>
        </Router>
      );
    }

  }
)
