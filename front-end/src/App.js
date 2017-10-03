import React, { Component } from 'react';
import {
  Grid,
  PageHeader
} from 'react-bootstrap'
import Map from './pages/map/map'

class App extends Component {
  render() {
    return (
      <Grid>
        <PageHeader>
		<div>
          <h1>THE SAN DIEGO CHALLENGE (tm)</h1>
		  <Map />
		</div>
        </PageHeader>
      </Grid>
    );
  }
}

export default App;
