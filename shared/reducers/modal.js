import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/modal'

const initialState = Immutable.fromJS({})

export default handleActions({
  [actions.showModal] (state, action) {
    return state.merge(Immutable.fromJS({ [action.payload]: 'show' }))
  },
  [actions.hideModal] (state, action) {
    return state.merge(Immutable.fromJS({ [action.payload]: 'hide' }))
  }
}, initialState)
