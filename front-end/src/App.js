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
import Leaderboard from './pages/Leaderboard'
import styles from './App.css'

import { addNewUser, checkLogin, handleUserLogin, handleUserLogout } from './actions/UserActions'
import {
  fetchAllActivities,
  fetchCompletedActivities,
  completeActivity,
  fetchUnfinishedActivities,
  fetchUserPoints,
  fetchLeaderboard,
  createNewActivity,
  deleteActivity
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
    loading: store.user.loading,
    submitError: store.user.submitError
  }
}

var apiUrl
if(process.env.NODE_ENV === 'production'){
  apiUrl = "/api"
} else {
  apiUrl = "http://localhost:3000/"
}

export default connect(mapComponentToProps)(
  class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        apiUrl: apiUrl
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
      this.props.dispatch(completeActivity(this.state.apiUrl, activity.id, activity.points))
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
                    (!this.props.user) &&
                    <div>
                      <div id="about">
                        <h4>
                        <p>Welcome to the San Diego Challenge! Whether you’re new or old to San Diego, we think you’ll find these challenges to be a fun and informative way to explore America’s Finest City. We’ve put together a fantastic list that will bring you, your friends, and family to the heart of what makes San Diego amazing.</p>
                        <p>To get started, choose a challenge from the Challenge List or Map. Once you get to the location, click the Complete button. Each challenge awards points upon completion. You can view your previous challenges on your user profile page as well as your total score.</p>
                        <p>Note: You’ll have to be at the location with your location services enabled in order to complete the challenge.</p>
                        <p>Check the leaderboard and try and get the top score! Have fun exploring!</p>
                        </h4>
                      </div>
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
                        <h2>Hello, {this.props.user.name}!</h2>
                        <h3>Here are the challenges you have yet to complete:</h3>
                      <ActivitiesAndMap
                        activities={this.props.unfinishedActivities}
                        user={this.props.user}
                        handleComplete={this.handleComplete.bind(this)}
                        handleDelete={this.handleDelete.bind(this)}
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
                <NavBarUser onSubmit={this.handleLogout.bind(this)} user={this.props.user}/>
                <Grid>
                  <PageHeader>
                    THE SAN DIEGO CHALLENGE
                  </PageHeader>
                  {
                    this.props.user &&
                    <h2>Hello, {this.props.user.name}!</h2>
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
                    {this.props.submitError &&
                      <div className = "signupAlert">
                        <Alert className="login_error" bsStyle="danger">
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
                  {this.props.submitError &&
                    <div className = "signupAlert">
                      <Alert className="login_error" bsStyle="danger">
                        {this.props.userError.message || "Are you sure you filled out each field?"}
                      </Alert>
                    </div>
                  }
                    {this.props.user &&
                      <Redirect to="/" />
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
                      (!this.props.user) && (!this.props.loading) &&
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
