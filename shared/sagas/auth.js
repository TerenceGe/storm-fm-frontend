import { takeEvery } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import cookie from 'react-cookie'
import * as api from '../utils/api'
import * as actions from '../actions/auth'
import { getCurrentUserRequested } from '../actions/me'

function* login(action) {
  try {
    const auth = yield call(api.login, action.payload)
    yield put(actions.loginSucceeded(auth))
  } catch (e) {
    yield put(actions.loginFailed(e.message))
  }
}

function* loginSucceeded(action) {
  cookie.save('token', action.payload.token, {
    path: '/',
    domain: 'stormfm.io'
  })
  yield put(getCurrentUserRequested())
}

export default function* authSaga() {
  yield fork(takeEvery, String(actions.loginRequested), login)
  yield fork(takeEvery, String(actions.loginSucceeded), loginSucceeded)
}
