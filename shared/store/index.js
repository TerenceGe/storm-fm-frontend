/* global window, require */

import { createStore, applyMiddleware } from 'redux'
import { logger } from '../middleware'
import rootReducer from '../reducers'

export default function configure(initialState) {
  const create = (typeof window !== 'undefined' && window.devToolsExtension)
    ? window.devToolsExtension()(createStore)
    : createStore

  const createStoreWithMiddleware = applyMiddleware(
    logger
  )(create)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'))
    })
  }

  return store
}
