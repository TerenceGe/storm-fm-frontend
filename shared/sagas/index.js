import { take, fork, cancel } from 'redux-saga/effects'
import tracksSaga from './tracks'

function* rootSaga() {
  yield fork(tracksSaga)
}

function createAbortableSaga(saga) {
  if (process.env.NODE_ENV === 'development') {
    return function* main() {
      const sagaTask = yield fork(saga)
      yield take('CANCEL_SAGAS_HMR')
      yield cancel(sagaTask)
    }
  }
  return saga
}

export default {
  start(sagaMiddleware) {
    [rootSaga].map(createAbortableSaga).forEach(saga => sagaMiddleware.run(saga))
  },
  cancel(store) {
    store.dispatch({ type: 'CANCEL_SAGAS_HMR' })
  }
}
