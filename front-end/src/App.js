import React, { Component } from 'react';
import {
  Grid,
  PageHeader
} from 'react-bootstrap'
import Activities from './pages/Activities.js'



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiUrl: "http://localhost:3000",
      activities: [],
      completedActivities: [],
      userID: 1,
      errors: null
  }
}

componentWillMount(){
  fetch(`${this.state.apiUrl}/completedactivities/${this.state.userID}`)
  .then((rawResponse) =>{
    console.log(rawResponse)
    return rawResponse.json()
  })
  .then((parsedResponse)=>{
    console.log(parsedResponse);
    this.setState({completedActivities: parsedResponse.completedactivities})
  })
  fetch(`${this.state.apiUrl}/activities/`)
  .then((rawResponse) =>{
    return rawResponse.json()
  })
  .then((parsedResponse)=>{
    this.setState({activities: parsedResponse.activities})
  })
}

  // componentWillMount(){
  //   fetch(`${this.state.apiUrl}/activities/`)
  //   .then((rawResponse) =>{
  //     return rawResponse.json()
  //   })
  //   .then((parsedResponse)=>{
  //     this.setState({activities: parsedResponse.activities})
  //   })
  // }

  render() {
    return (
      <Grid>
        <PageHeader>
          THE SAN DIEGO CHALLENGE (tm)
        </PageHeader>
        <Activities
          activities={this.state.activities}
          completedactivities={this.state.completedactivities}
        />
      </Grid>
    );
  }
}

export default App;
