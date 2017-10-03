import React, { Component } from 'react';
import {
  Grid,
  PageHeader
} from 'react-bootstrap'
import ActivityModal from './ActivityModal.js'

class App extends Component {
  render() {
    return (
      <Grid>
        <PageHeader>
          <h1>THE SAN DIEGO CHALLENGE (tm)</h1>
        </PageHeader>
        <ActivityModal/>
      </Grid>
    );
  }
}

export default App;
