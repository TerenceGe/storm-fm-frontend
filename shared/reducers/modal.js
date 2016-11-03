import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/modal'

const initialState = Immutable.fromJS({
  isOpen: false
})

export default handleActions({
  [actions.showModal] (state, action) {
    return state.set('isOpen', true).merge(Immutable.fromJS({ active: action.payload }))
  },
  [actions.hideModal] (state) {
    return state.set('isOpen', false).delete('active')
  }
}, initialState)
