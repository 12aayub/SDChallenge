import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from 'react-router-dom'
import {
  Grid,
  PageHeader
} from 'react-bootstrap'
import ActivitiesAndMap from './pages/ActivitiesAndMap'
import NewActivity from './pages/newActivity'
import Activities from './pages/Activities'
import CompletedActivities from './pages/CompletedActivities'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiUrl: "http://localhost:3000",
      activities: [],
      users: [],
      completedactivities: [],
      currentUser: {
        id: 1,
        firstName: 'Bob',
        lastName: 'Roberts',
        email: 'bobby@example.com'
      },
      errors: null
  }
}


componentWillMount(){
  this.props.dispatch(fetchAllActivities(this.state.apiUrl))
  this.props.dispatch(fetchCompletedActivities(this.state.apiUrl))
}

  render() {
    return (
    <div>
      <Grid>
        <PageHeader>
          THE SAN DIEGO CHALLENGE (tm)
        </PageHeader>
        <Activities
          activities={this.state.activities}
          // {completedactivities={this.state.completedactivities}
        />
      </Grid>
    <Router>
      <Route exact path="/completedactivities" render={props => (<CompletedActivities completedactivities={this.state.completedactivities} />
      )} />
    </Router>
    </div>
    );
  }
}
