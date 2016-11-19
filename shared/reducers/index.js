import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form/es/immutable'
import modal from './modal'
import intl from './intl'
import auth from './auth'
import me from './me'
import tracks from './tracks'
import likes from './likes'
import comments from './comments'

export default combineReducers({
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
