import React, { Component } from 'react';
import {
  Grid,
  PageHeader
} from 'react-bootstrap'
import Activities from './pages/Activities'

class App extends Component {
  render() {
    return (
      <Grid>
        <PageHeader>
          <h1>THE SAN DIEGO CHALLENGE (tm)</h1>
        </PageHeader>

<Activities />

      </Grid>
    );
  }
}

export default App;
