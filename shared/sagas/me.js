import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as api from 'utils/api'
import * as actions from 'actions/me'

function* getCurrentUser(action) {
  try {
    const user = yield call(api.getCurrentUser, action.payload)
    yield put(actions.getCurrentUserSucceeded(user))
  } catch (e) {
    yield put(actions.getCurrentUserFailed(e.message))
  }
}

export default function* meSaga() {
  yield takeEvery(String(actions.getCurrentUserRequested), getCurrentUser)
}
