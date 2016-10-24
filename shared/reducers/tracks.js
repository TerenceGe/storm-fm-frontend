import { handleActions } from 'redux-actions'
import { getTracksRequested, getTracksSucceeded, getTracksFailed } from '../actions/tracks'

const initialState = {
  data: [],
  loading: false
}

export default handleActions({
  [getTracksRequested] (state) {
    return { ...state, loading: true }
  },
  [getTracksSucceeded] (state, action) {
    return { data: [...state.data, action.tracks], loading: false }
  },
  [getTracksFailed] (state) {
    return { ...state, loading: false }
  }
}, initialState)
