import { fork } from 'redux-saga/effects'
import authSaga from './auth'
import meSaga from './me'
import tracksSaga from './tracks'
import likesSaga from './likes'
import commentsSaga from './comments'
import loggerSaga from './logger'

export default function* rootSaga() {
  yield [
    fork(authSaga),
    fork(meSaga),
    fork(tracksSaga),
    fork(likesSaga),
    fork(commentsSaga),
    fork(loggerSaga)
  ]
}
