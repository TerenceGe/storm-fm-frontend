import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'
import {
  setToImmutableStateFunc,
  setToMutableStateFunc,
  immutableReducer as reduxAsyncConnect
} from 'redux-connect'
import { reducer as form } from 'redux-form/es/immutable'
import routing from './routing'
import modal from './modal'
import intl from './intl'
import auth from './auth'
import me from './me'
import tracks from './tracks'
import likes from './likes'
import comments from './comments'

setToImmutableStateFunc(mutableState => Immutable.fromJS(mutableState))
setToMutableStateFunc(immutableState => immutableState.toJS())

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
