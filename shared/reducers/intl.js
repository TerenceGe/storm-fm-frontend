import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/intl'

const initialState = Immutable.fromJS({
  locale: 'zh',
  initialNow: Date.now()
})

export default handleActions({
  [actions.setLocale] (state, action) {
    return state.set('locale', action.payload)
  }
}, initialState)
