import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as api from '../utils/api'
import * as actions from '../actions/comments'

function* createComment(action) {
  try {
    const like = yield call(api.createComment, action.payload)
    yield put({ type: String(actions.createCommentSucceeded), payload: like })
  } catch (e) {
    yield put({ type: String(actions.createCommentFailed), message: e.message })
  }
}

export default function* tracksSaga() {
  yield* takeEvery(String(actions.createCommentRequested), createComment)
}
