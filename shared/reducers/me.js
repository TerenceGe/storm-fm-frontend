import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/me'

const initialState = Immutable.fromJS({
  data: {},
  loading: false,
  loaded: false
})

export default handleActions({
  [actions.getCurrentUserRequested] (state) {
    return state.delete('error').set('loading', true)
  },
  [actions.getCurrentUserSucceeded] (state, action) {
    return state.set('loading', false).set('loaded', true)
      .update('data', v => v.merge(Immutable.fromJS(action.payload)))
  },
  [actions.getCurrentUserFailed] (state, action) {
    return state.set('loading', false).merge(Immutable.fromJS({ error: action.payload }))
  }
}, initialState)
