import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/auth'

const initialState = Immutable.fromJS({
  data: {},
  loading: false,
  loaded: false
})

export default handleActions({
  [actions.loginRequested] (state) {
    return state.set('loading', true)
  },
  [actions.loginSucceeded] (state, action) {
    return state.set('loading', false).set('loaded', true)
      .update('data', v => v.merge(Immutable.fromJS(action.payload)))
  },
  [actions.loginFailed] (state) {
    return state.set('loading', false)
  }
}, initialState)
