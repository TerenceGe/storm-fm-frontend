import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null
})

export default handleActions({
  [LOCATION_CHANGE] (state, action) {
    return state.merge({
      locationBeforeTransitions: action.payload
    })
  }
}, initialState)
