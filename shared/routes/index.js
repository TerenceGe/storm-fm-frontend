/* @jsx */

import React from 'react'
import Match from 'react-router/Match'
import App from '../containers/App'
import Home from '../containers/App/Home'
import Tracks from '../containers/App/Tracks'

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="tracks" component={Tracks} />
  </Route>
)

export default Routes
