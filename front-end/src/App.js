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
      errors: null
  }
}

  componentWillMount(){
    fetch(`${this.state.apiUrl}/activities`)
    .then((rawResponse) =>{
      return rawResponse.json()
    })
    .then((parsedResponse)=>{
      this.setState({activities: parsedResponse.activities})
    })
  }

  render() {
    return (
      <Grid>
        <PageHeader>
          <h1>THE SAN DIEGO CHALLENGE (tm)</h1>
        </PageHeader>
        <Activities activities={this.state.activities}/>
      </Grid>
    );
  }
}

export default App;
