import React, { Component } from 'react';
import { Grid, PageHeader } from 'react-bootstrap'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'

import ActivitiesAndMap from './pages/ActivitiesAndMap'
import NewActivity from './pages/newActivity'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProfilePage from './pages/ProfilePage'
import NavBarUser from './pages/NavbarUser'
import NavBar from './pages/Navbar'
import styles from './App.css'

import { addNewUser, checkLogin, handleUserLogin, handleUserLogout } from './actions/UserActions'
import {
  fetchAllActivities,
  fetchCompletedActivities,
  completeActivity,
  fetchUnfinishedActivities
} from './actions/ActivitiesActions'

const mapComponentToProps = (store) =>{
  return {
    user: store.user.currentUser,
    userError: store.user.error,
    allActivities: store.allActivities.allActivities,
    completedActivities: store.completedActivities.completedActivities,
    unfinishedActivities: store.unfinishedActivities.unfinishedActivities
  }
}

export default connect(mapComponentToProps)(
  class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        apiUrl: "http://localhost:3000"
      }
    }

    handleNewUser(input){
      this.props.dispatch(addNewUser(this.state.apiUrl, input))
    }

    handleLogin(input){
      this.props.dispatch(handleUserLogin(this.state.apiUrl, input))
    }

    handleLogout(){
      this.props.dispatch(handleUserLogout())
    }

    handleComplete(activity){
      this.props.dispatch(completeActivity(this.state.apiUrl, activity))
    }

    handleLogout(){
      this.props.dispatch(handleUserLogout())
    }

    componentWillMount(){
      this.props.dispatch(checkLogin(this.state.apiUrl))
      this.props.dispatch(fetchAllActivities(this.state.apiUrl))
      this.props.dispatch(fetchCompletedActivities(this.state.apiUrl))
      this.props.dispatch(fetchUnfinishedActivities(this.state.apiUrl))
    }

    render() {
      return (
        <Router>
          <div>
            <Route exact path="/" render={props => (
              <div className = "App">
                <video id="background-video" loop autoPlay>
                  <source src='../Sunset-Siesta.mp4' type="video/mp4" />
                  <source src='../Sunset-Siesta.mp4' type="video/ogg" />
                </video>
                {
                  this.props.user &&
                  <NavBarUser onSubmit={this.handleLogout.bind(this)}/>
                }
                {
                  !this.props.user &&
                  <NavBar/>
                }
                <Grid>
                  <PageHeader>
                    THE SAN DIEGO CHALLENGE
                  </PageHeader>
                  {
                    !this.props.user &&
                    <ActivitiesAndMap
                      activities={this.props.allActivities}
                      user={this.props.user}
                      handleComplete={this.handleComplete.bind(this)}
                    />
                  }
                  {
                    this.props.user &&
                    <div>
                        <h2>Hello, {this.props.user.name}!</h2>
                        <h3>Here are the challenges you have yet to complete:</h3>
                      <ActivitiesAndMap
                        activities={this.props.unfinishedActivities}
                        user={this.props.user}
                        handleComplete={this.handleComplete.bind(this)}
                      />
                    </div>
                  }
                </Grid>
              </div>
            )}/>

            <Route exact path="/profile" render={props => (
              <div className = "App">
                <video id="background-video" loop autoPlay>
                  <source src='../Sunset-Siesta.mp4' type="video/mp4" />
                  <source src='../Sunset-Siesta.mp4' type="video/ogg" />
                </video>
                <NavBarUser/>
                <Grid>
                  <PageHeader>
                    THE SAN DIEGO CHALLENGE
                  </PageHeader>
                  {
                    !this.props.user &&
                    <Redirect to="/" />
                  }
                  {
                    this.props.user &&
                    <h2>Hello, {this.props.user.name}!</h2>
                  }
                  {
                    this.props.user &&
                    <ProfilePage
                      user={this.props.user}
                      completedActivities={this.props.completedActivities}
                      onSubmit={this.handleLogout.bind(this)} />
                  }
                </Grid>
              </div>
            )}/>

            <Route exact path="/signup" render={props => (
              <div className = "App">
                <video id="background-video" loop autoPlay>
                  <source src='../Sunset-Siesta.mp4' type="video/mp4" />
                  <source src='../Sunset-Siesta.mp4' type="video/ogg" />
                </video>
                <NavBar/>
                <Grid>
                  <PageHeader>
                    THE SAN DIEGO CHALLENGE
                  </PageHeader>
                  <Signup onSubmit={this.handleNewUser.bind(this)} />
                    {this.props.user &&
                      <Redirect to="/" />
                    }
                </Grid>
              </div>
            )}/>

            <Route exact path="/login" render={props => (
              <div className = "App">
                <video id="background-video" loop autoPlay>
                  <source src='../Sunset-Siesta.mp4' type="video/mp4" />
                  <source src='../Sunset-Siesta.mp4' type="video/ogg" />
                </video>
                <NavBar/>
                <Grid>
                  <PageHeader>
                    THE SAN DIEGO CHALLENGE
                  </PageHeader>
                  <Login onSubmit={this.handleLogin.bind(this)} />
                    {this.props.user &&
                      <Redirect to="/" />
                    }
                </Grid>
              </div>
            )}/>

            <Route exact path="/activities/new" render={props => (
              <div className = "App">
                <video id="background-video" loop autoPlay>
                  <source src='../Sunset-Siesta.mp4' type="video/mp4" />
                  <source src='../Sunset-Siesta.mp4' type="video/ogg" />
                </video>
                <NavBar/>
                <Grid>
                  {
                    this.props.user.email==="admin@example.com" &&
                    <NewActivity onSubmit={this.handleNewActivity.bind(this)} />
                  }
                </Grid>
              </div>
            )}/>
          </div>
        </Router>
      );
    }

  }
)
