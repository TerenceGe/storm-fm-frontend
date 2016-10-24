import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as api from '../utils/api'
import { getTracksRequested, getTracksSucceeded, getTracksFailed } from '../actions/tracks'

function* getTracks(action) {
  try {
    const tracks = yield call(api.getTracks, action.payload)
    yield put({ type: String(getTracksSucceeded), tracks })
  } catch (e) {
    yield put({ type: String(getTracksFailed), message: e.message })
  }
}

export default function* tracksSaga() {
  yield* takeEvery(String(getTracksRequested), getTracks)
}
