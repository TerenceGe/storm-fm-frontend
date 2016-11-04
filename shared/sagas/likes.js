import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as api from '../utils/api'
import * as actions from '../actions/likes'

function* createLike(action) {
  try {
    const like = yield call(api.createLike, action.payload)
    yield put({ type: String(actions.createLikeSucceeded), payload: like })
  } catch (e) {
    yield put({ type: String(actions.createLikeFailed), message: e.message })
  }
}

export default function* likesSaga() {
  yield* takeEvery(String(actions.createLikeRequested), createLike)
}
