import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import intl from './intl'

export default combineReducers({
  routing,
  intl
})
