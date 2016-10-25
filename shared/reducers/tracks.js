import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import { getTracksRequested, getTracksSucceeded, getTracksFailed } from '../actions/tracks'

const initialState = Immutable.fromJS({
  data: [],
  loading: false
})

export default handleActions({
  [getTracksRequested] (state) {
    return state.set('loading', true)
  },
  [getTracksSucceeded] (state, action) {
    return state.set('loading', false)
      .update('data', v => v.push(Immutable.fromJS(action.tracks)))
  },
  [getTracksFailed] (state) {
    return state.set('loading', false)
  }
}, initialState)
