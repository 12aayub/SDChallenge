import React, { Component } from 'react';
import {
  Grid,
  PageHeader
} from 'react-bootstrap'
import ActivityModal from './ActivityModal.js'
import Activities from './pages/Activities'


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

        <ActivityModal/>
        <Activities />


      </Grid>
    );
  }
}

export default App;
