import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  // Redirect,
  Route
} from 'react-router-dom'
import {
  Grid,
  PageHeader
} from 'react-bootstrap'
import { connect } from 'react-redux'
import ActivitiesAndMap from './pages/ActivitiesAndMap'
import NewActivity from './pages/newActivity'
import CompletedActivities from './pages/CompletedActivities'
import { fetchAllActivities } from './actions/allActivitiesAction'
import { fetchCompletedActivities } from './actions/completedActivitiesAction'

const mapComponentToProps = (store) =>{
  return {
    allActivities: store.allActivities.allActivities,
    completedActivities: store.completedActivities.completedActivities,
    user: store.user.currentUser,
    userError: store.user.error
  }
}

export default connect(mapComponentToProps)(
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
  this.props.dispatch(fetchCompletedActivities(this.state.apiUrl, this.state.currentUser.id))
}

  render() {
    return (
    <div>
      <Grid>
        <PageHeader>
          THE SAN DIEGO CHALLENGE (tm)
        </PageHeader>
        <ActivitiesAndMap activities={this.props.allActivities} />
        <NewActivity />
      </Grid>
    <Router>
      <Route exact path="/" render={props => (<CompletedActivities completedactivities={this.props.completedActivities} />
      )} />
    </Router>
    </div>
    );
  }
}
)
