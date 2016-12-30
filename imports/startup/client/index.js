/* global document */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Search from '../../ui/pages/Search';

render((
  <Router history={browserHistory}>
    <Route path="/" component={Search} />
  </Router>
), document.getElementById('app'));
