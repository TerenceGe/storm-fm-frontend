/* @jsx */
/* global document, window */

import React from 'react'
import ReactDOM from 'react-dom'
import browserHistory from 'react-router/lib/browserHistory'
import { Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { ReduxAsyncConnect } from 'redux-connect'
import Transit from 'transit-immutable-js'
import Provider from '../shared/components/Provider'
import configure from '../shared/store'
import routes from '../shared/routes'
import sagas from '../shared/sagas'

const preloadedState = window.__PRELOADED_STATE__ && Transit.fromJSON(window.__PRELOADED_STATE__)

const store = configure(preloadedState)
const history = syncHistoryWithStore(browserHistory, store)
store.runSaga(sagas)

const App = () => (
  <Provider store={store}>
    <Router render={props => <ReduxAsyncConnect {...props} />} history={history} routes={routes} />
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'))
