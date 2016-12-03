import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from 'actions/likes'

const initialState = Immutable.fromJS({
  data: {},
  loading: false
})

export default handleActions({
  [actions.createLikeRequested] (state) {
    return state.set('loading', true)
  },
  [actions.createLikeSucceeded] (state, action) {
    return state.set('loading', false)
      .update('data', v => v.merge(Immutable.fromJS(action.playload)))
  },
  [actions.createLikeFailed] (state) {
    return state.set('loading', false)
  }
}, initialState)
