import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from 'actions/comments'

const initialState = Immutable.fromJS({
  data: {},
  loading: false
})

export default handleActions({
  [actions.createCommentRequested] (state) {
    return state.set('loading', true)
  },
  [actions.createCommentSucceeded] (state, action) {
    return state.set('loading', false)
      .update('data', v => v.merge(Immutable.fromJS(action.playload)))
  },
  [actions.createCommentFailed] (state) {
    return state.set('loading', false)
  }
}, initialState)
