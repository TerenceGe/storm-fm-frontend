import { combineReducers } from 'redux'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import { routerReducer as routing } from 'react-router-redux'
import intl from './intl'
import auth from './auth'
import tracks from './tracks'

export default combineReducers({
  reduxAsyncConnect,
  routing,
  intl,
  auth,
  tracks
})
