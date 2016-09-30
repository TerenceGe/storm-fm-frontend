/* global window */

import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import React from 'react'
import 'normalize.css'
import ConnectedIntlProvider from './components/ConnectedIntlProvider'

import routes from './routes'
import configure from './store'

const preloadedState = window.__PRELOADED_STATE__
const store = configure(preloadedState)
const history = syncHistoryWithStore(browserHistory, store)

const App = () => (
  <Provider store={store}>
    <ConnectedIntlProvider>
      <Router history={history} routes={routes} />
    </ConnectedIntlProvider>
  </Provider>
)

export default App
