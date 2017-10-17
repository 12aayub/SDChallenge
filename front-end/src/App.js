import React, { Component } from 'react';
import { Grid, PageHeader, Alert, HelpBlock } from 'react-bootstrap'
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
  fetchUnfinishedActivities,
  createNewActivity,
  deleteActivity
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
      window.location="/"
    }

    handleComplete(activity){
      this.props.dispatch(completeActivity(this.state.apiUrl, activity))
    }

    handleNewActivity(input){
      this.props.dispatch(createNewActivity(this.state.apiUrl, input))
    }

    handleDelete(activity){
       this.props.dispatch(deleteActivity(this.state.apiUrl, activity))
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
                  <NavBarUser onSubmit={this.handleLogout.bind(this)} user={this.props.user}/>
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
                      handleDelete={this.handleDelete.bind(this)}
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
                        handleDelete={this.handleDelete.bind(this)}
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
                <NavBarUser onSubmit={this.handleLogout.bind(this)} user={this.props.user}/>
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
                      onSubmit={this.handleLogout.bind(this)}
                      handleDelete={this.handleDelete.bind(this)}
                    />
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
                    {this.props.userError &&
                      <div className = "signupAlert">
                        <Alert className="login_error2" bsStyle="danger">
                        {this.props.userError.message || "Are you sure you filled out each field?"}
                        </Alert>
                      </div>
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
                  <Login
                  onSubmit={this.handleLogin.bind(this)}  />
                    {this.props.user &&
                      <Redirect to="/" />
                    }
                    {this.props.userError &&
                      <Alert className="login_error1" bsStyle="danger">
                      User not found, try again!
                      </Alert>
                    }
                </Grid>
              </div>
            )}/>

            <Route exact path="/addactivity" render={props => (
              <div className = "App">
                <video id="background-video" loop autoPlay>
                  <source src='../Sunset-Siesta.mp4' type="video/mp4" />
                  <source src='../Sunset-Siesta.mp4' type="video/ogg" />
                </video>
                <NavBarUser onSubmit={this.handleLogout.bind(this)} user={this.props.user}/>
                <Grid>
                    <NewActivity onSubmit={this.handleNewActivity.bind(this)} />
                    {
                      this.props.user && (this.props.user.email!=="admin@example.com") &&
                      <Redirect to="/" />
                    }
                    {
                      !this.props.user &&
                      <Redirect to="/" />
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
