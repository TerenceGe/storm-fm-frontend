import { fork } from 'redux-saga/effects'
import tracksSaga from './tracks'
import loggerSaga from './logger'

export default function* rootSaga() {
  yield [
    fork(tracksSaga),
    fork(loggerSaga)
  ]
}
