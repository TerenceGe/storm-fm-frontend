/* @jsx */
/* global document, window */

import co from 'co'
import React from 'react'
import ReactDOM from 'react-dom'
import { match, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { ReduxAsyncConnect } from 'redux-connect'
import Transit from 'transit-immutable-js'
import Provider from 'components/Provider'
import { errorLoading } from 'utils/error'
import configure from 'store'
import routes from 'routes'
import sagas from 'sagas'

const preloadedState = window.__PRELOADED_STATE__ && Transit.fromJSON(window.__PRELOADED_STATE__)
const store = configure(preloadedState)
const history = syncHistoryWithStore(browserHistory, store)
const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

store.runSaga(sagas)

co(function* () {
  if (!window.Intl) {
    yield System.import('intl')
    yield Promise.all([
      System.import('intl/locale-data/jsonp/en.js'),
      System.import('intl/locale-data/jsonp/zh.js')
    ])
    console.log('using intl polyfill')
  }

  match({ routes, location }, () => {
    ReactDOM.render(
      <Provider store={store}>
        <Router
          onUpdate={() => window.scrollTo(0, 0)}
          render={props => <ReduxAsyncConnect {...props} />}
          history={history}
          routes={routes}
        />
      </Provider>,
      document.getElementById('app')
    )
  })
}).catch(errorLoading)
