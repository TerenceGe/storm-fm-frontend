import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as api from '../utils/api'
import * as actions from '../actions/me'

function* getCurrentUser(action) {
  try {
    const user = yield call(api.getCurrentUser, action.payload)
    yield put({ type: String(actions.getCurrentUserSucceeded), payload: user })
  } catch (e) {
    yield put({ type: String(actions.getCurrentUserFailed), payload: e.message })
  }
}

export default function* meSaga() {
  yield takeEvery(String(actions.getCurrentUserRequested), getCurrentUser)
}
