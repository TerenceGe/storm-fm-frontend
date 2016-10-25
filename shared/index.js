/* @jsx */
/* global window */

import React from 'react'
import Immutable from 'immutable'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import transit from 'transit-immutable-js'
import 'normalize.css'
import Provider from './components/Provider'
import routes from './routes'
import configure from './store'

const preloadedState = transit.fromJSON(window.__PRELOADED_STATE__)

const store = configure(preloadedState)
const history = syncHistoryWithStore(browserHistory, store)

const App = () => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
)

export default App
