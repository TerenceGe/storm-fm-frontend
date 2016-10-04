/* react@jsx */

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../containers/App'
import Home from '../containers/App/Home'

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
)

export default Routes
