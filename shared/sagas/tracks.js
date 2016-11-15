import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as api from '../utils/api'
import * as actions from '../actions/tracks'

function* getTracks(action) {
  try {
    const tracks = yield call(api.getTracks, action.payload)
    if (tracks.tracks.length) {
      yield put(actions.getTracksSucceeded(tracks))
    }
  } catch (e) {
    yield put(actions.getTracksFailed(e.message))
  }
}

export default function* tracksSaga() {
  yield* takeEvery(String(actions.getTracksRequested), getTracks)
}
