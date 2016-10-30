import { fork } from 'redux-saga/effects'
import authSaga from './auth'
import tracksSaga from './tracks'
import loggerSaga from './logger'

export default function* rootSaga() {
  yield [
    fork(authSaga),
    fork(tracksSaga),
    fork(loggerSaga)
  ]
}
