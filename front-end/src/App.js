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
import Leaderboard from './pages/Leaderboard'
import styles from './App.css'

import { addNewUser, checkLogin, handleUserLogin, handleUserLogout } from './actions/UserActions'
import {
  fetchAllActivities,
  fetchCompletedActivities,
  completeActivity,
  fetchUnfinishedActivities,
  fetchUserPoints,
  fetchLeaderboard
} from './actions/ActivitiesActions'

const mapComponentToProps = (store) =>{
  return {
    user: store.user.currentUser,
    userError: store.user.error,
    allActivities: store.allActivities.allActivities,
    completedActivities: store.completedActivities.completedActivities,
    unfinishedActivities: store.unfinishedActivities.unfinishedActivities,
    userPoints: store.userPoints.userPoints,
    leaderboard: store.leaderboard.leaderboard,
    loading: store.user.loading
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

    handleComplete(activity){
      this.props.dispatch(completeActivity(this.state.apiUrl, activity.id, activity.points))
    }

    handleLogout(){
      this.props.dispatch(handleUserLogout())
    }

    componentWillMount(){
      this.props.dispatch(checkLogin(this.state.apiUrl))
      this.props.dispatch(fetchAllActivities(this.state.apiUrl))
      this.props.dispatch(fetchCompletedActivities(this.state.apiUrl))
      this.props.dispatch(fetchUnfinishedActivities(this.state.apiUrl))
      this.props.dispatch(fetchUserPoints(this.state.apiUrl))
      this.props.dispatch(fetchLeaderboard(this.state.apiUrl))
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
                  (!this.props.user) &&
                  <NavBar/>
                }
                <Grid>
                  <PageHeader>
                    THE SAN DIEGO CHALLENGE
                  </PageHeader>

                  {
                    (!this.props.user) &&
                    <div>
                      <h4 id="about">Welcome to the San Diego Challenge! If you’re new or old to San Diego, we think you’ll find these challenges to be a fun and informative way to explore America’s Finest City. We’ve put together a fantastic list that will bring you and your friends and family right in the middle of what makes San Diego amazing.
                      To get started, just click around the Activities List until you find the one you want to do. Each activity awards points upon completion, Once you get to the location and complete the activity, click the Complete button. Note: You’ll have to be at the location with your GPS on in order to complete the activity! Once activities are completed, your points will be added up with previous completed activities. Your total score will be displayed on your user profile as well as the Leaderboard.
                      OK that’s it! Have fun exploring!</h4>
                      <ActivitiesAndMap
                        activities={this.props.allActivities}
                        user={this.props.user}
                        handleComplete={this.handleComplete.bind(this)}
                      />
                      <Leaderboard leaderboard={this.props.leaderboard}/>
                    </div>
                  }
                  {
                    this.props.user &&
                    <div>
                        <h2>HELLO, {this.props.user.name.toUpperCase()}!</h2>
                        <h3>Here are the challenges you have yet to complete:</h3>
                      <ActivitiesAndMap
                        activities={this.props.unfinishedActivities}
                        user={this.props.user}
                        handleComplete={this.handleComplete.bind(this)}
                      />
                      <Leaderboard leaderboard={this.props.leaderboard}/>
                    </div>
                  }
                  {
                    (this.props.user==null) && (this.props.loading) &&
                    <div></div>
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
                {
                  (!this.props.user) &&
                  <NavBar/>
                }
                {
                  this.props.user &&
                  <NavBarUser onSubmit={this.handleLogout.bind(this)}/>
                }
                <Grid>
                  <PageHeader>
                    THE SAN DIEGO CHALLENGE
                  </PageHeader>
                  {
                    this.props.user &&
                    <h2>HELLO, {this.props.user.name.toUpperCase()}!</h2>
                  }
                  {
                    this.props.user &&
                    <div>
                      <ProfilePage
                        user={this.props.user}
                        completedActivities={this.props.completedActivities}
                        onSubmit={this.handleLogout.bind(this)}
                        userPoints={this.props.userPoints}
                        leaderPoints={this.props.leaderPoints} />
                      <Leaderboard leaderboard={this.props.leaderboard}/>
                    </div>
                  }
                  {
                    (this.props.user==null) && (this.props.loading) &&
                    <div></div>
                  }
                  {
                    (this.props.user==null) && (!this.props.loading) &&
                    <Redirect to="/" />
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
                  {/*
                    this.props.user.email==="admin@example.com" &&
                    <NewActivity onSubmit={this.handleNewActivity.bind(this)} />
                  */}
                </Grid>
              </div>
            )}/>
          </div>
        </Router>
      );
    }

  }
)
