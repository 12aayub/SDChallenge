import React, { Component } from 'react';
import { Grid, PageHeader } from 'react-bootstrap'
import { connect } from 'react-redux'
import ActivitiesAndMap from './pages/ActivitiesAndMap'
import NewActivity from './pages/newActivity'
import fetchAllActivities from './actions/allActivitiesAction'
import fetchCompletedActivities from './actions/allActivitiesAction'

const mapComponentToProps = (store) => {
  return {
    allActivities: store.allActivities,
    completedActivities: store.completedActivities
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

    componentWillMount(){
      this.props.dispatch(fetchAllActivities(this.state.apiUrl))
      this.props.dispatch(fetchCompletedActivities(this.state.apiUrl))
    }

    render() {
      return (
        <Grid>
          <PageHeader>
              THE SAN DIEGO CHALLENGE (tm)
          </PageHeader>
          <ActivitiesAndMap activities={this.props.allActivities} userID={this.props.userID}/>
          <NewActivity />
        </Grid>
      );
    }

  }
)
