/* @jsx */
/* global document, window */

import React from 'react'
import ReactDOM from 'react-dom'
import { match, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { ReduxAsyncConnect } from 'redux-connect'
import { fromJS } from 'immutable'
import Provider from '../shared/components/Provider'
import configure from '../shared/store'
import routes from '../shared/routes'
import sagas from '../shared/sagas'

const preloadedState = fromJS(window.__PRELOADED_STATE__)
const store = configure(preloadedState)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState (state) {
    return state.get('routing').toObject();
  }
})
const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

store.runSaga(sagas)

match({ routes, location }, () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router
        render={props => <ReduxAsyncConnect {...props} />}
        history={history}
        routes={routes}
      />
    </Provider>,
    document.getElementById('app')
  )
})
