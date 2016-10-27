/* @jsx */
/* global window */

import React from 'react'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { ReduxAsyncConnect } from 'redux-connect'
import Transit from 'transit-immutable-js'
import 'normalize.css'
import Provider from './components/Provider'
import routes from './routes'
import configure from './store'
import sagas from './sagas'

const preloadedState = window.__PRELOADED_STATE__ && Transit.fromJSON(window.__PRELOADED_STATE__)

const store = configure(preloadedState)
const history = syncHistoryWithStore(browserHistory, store)
store.runSaga(sagas)

const App = () => (
  <Provider store={store}>
    <Router render={props => <ReduxAsyncConnect {...props} />} history={history} routes={routes} />
  </Provider>
)

export default App
