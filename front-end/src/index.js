import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Activities from './pages/Activities'

ReactDOM.render(<Activities />, document.getElementById('root'));
registerServiceWorker();
