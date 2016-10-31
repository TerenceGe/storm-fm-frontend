import { combineReducers } from 'redux'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import { routerReducer as routing } from 'react-router-redux'
import intl from './intl'
import auth from './auth'
import tracks from './tracks'
import likes from './likes'
import comments from './comments'

export default combineReducers({
  reduxAsyncConnect,
  routing,
  intl,
  auth,
  tracks,
  likes,
  comments
})
