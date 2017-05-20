import { createInjectableStore } from 'redux-injectable-store'
import { applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from 'reducers'

export default function configure (initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))
  const store = createInjectableStore(initialState, enhancer)
  store.injectAll(rootReducer)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'))
    })
  }

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}
