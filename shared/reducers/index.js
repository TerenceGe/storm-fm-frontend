import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import intl from './intl'
import tracks from './tracks'

export default combineReducers({
  routing,
  intl,
  tracks
})
