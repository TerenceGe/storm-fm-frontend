import { combineReducers } from 'redux'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form/immutable'
import modal from './modal'
import intl from './intl'
import auth from './auth'
import me from './me'
import tracks from './tracks'
import likes from './likes'
import comments from './comments'

export default combineReducers({
  reduxAsyncConnect,
  routing,
  form,
  modal,
  intl,
  auth,
  me,
  tracks,
  likes,
  comments
})
