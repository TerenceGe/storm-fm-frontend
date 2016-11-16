/* @jsx */

import React from 'react'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'
import App from '../containers/App'
import Home from '../containers/App/Home'

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
)

export default Routes
