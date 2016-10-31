import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/tracks'

const initialState = Immutable.fromJS({
  data: [],
  loading: false,
  loaded: false
})

export default handleActions({
  [actions.getTracksRequested] (state) {
    return state.set('loading', true)
  },
  [actions.getTracksSucceeded] (state, action) {
    return state.set('loading', false).set('loaded', true)
      .update('data', v => v.push(Immutable.fromJS(action.payload)))
  },
  [actions.getTracksFailed] (state) {
    return state.set('loading', false)
  }
}, initialState)
