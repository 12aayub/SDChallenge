import React, { Component } from 'react';
import {
  Grid,
  PageHeader
} from 'react-bootstrap'
import {connect} from 'react-redux'
import ActivitiesAndMap from './pages/ActivitiesAndMap'
import NewActivity from './pages/newActivity'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activitiesRequest: {
        apiUrl: "localhost:3000/"
      }
    }
  }

  componentWillMount(){
    this.props.dispatch(fetchAllActivities(this.state.activitiesRequest))
    this.props.dispatch(fetchCompletedActivities(this.state.activitiesRequest))
  }

  render() {
    return (
      <Grid>
        <PageHeader>
            THE SAN DIEGO CHALLENGE (tm)
        </PageHeader>
        <ActivitiesAndMap activities={this.state.activities}/>
        <NewActivity />
      </Grid>
    );
  }
}

export default App;
