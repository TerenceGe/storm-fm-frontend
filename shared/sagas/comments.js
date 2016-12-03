import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as api from 'utils/api'
import * as actions from 'actions/comments'

function* createComment(action) {
  try {
    const like = yield call(api.createComment, action.payload)
    yield put(actions.createCommentSucceeded(like))
  } catch (e) {
    yield put(actions.createCommentFailed(e.message))
  }
}

export default function* commentsSaga() {
  yield* takeEvery(String(actions.createCommentRequested), createComment)
}
