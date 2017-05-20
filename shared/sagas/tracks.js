import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as api from 'utils/api'
import * as actions from 'actions/tracks'

function* getTracksRequested(action) {
  try {
    const tracks = Array.isArray(action.payload) ?
          yield action.payload.map(payload => call(api.getTracks, payload)) :
          [yield call(api.getTracks, action.payload)]
    yield put(actions.getTracksSucceeded(tracks))
  } catch (e) {
    yield put(actions.getTracksFailed(e.message))
  }
}

export default function* tracksSaga() {
  yield* takeEvery(String(actions.getTracksRequested), getTracksRequested)
}
