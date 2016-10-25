/* global window, require */

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import sagas from '../sagas'

export default function configure(initialState) {
  const create = (typeof window !== 'undefined' && window.devToolsExtension)
    ? window.devToolsExtension()(createStore)
    : createStore

  const sagaMiddleware = createSagaMiddleware()
  const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(create)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  sagas.start(sagaMiddleware)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'))
    })
    module.hot.accept('../sgags', () => {
      sagas.cancel(store)
      require('../sagas').default.start(sagaMiddleware)
    })
  }

  return store
}
