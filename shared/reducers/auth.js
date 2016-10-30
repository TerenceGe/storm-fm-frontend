import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import { loginRequested, loginSucceeded, loginFailed } from '../actions/auth'

const initialState = Immutable.fromJS({
  data: [],
  loading: false,
  loaded: false
})

export default handleActions({
  [loginRequested] (state) {
    return state.set('loading', true)
  },
  [loginSucceeded] (state, action) {
    return state.set('loading', false).set('loaded', true)
      .update('data', v => v.merge(Immutable.fromJS(action.auth)))
  },
  [loginFailed] (state) {
    return state.set('loading', false)
  }
}, initialState)
