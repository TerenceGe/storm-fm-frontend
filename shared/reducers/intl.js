import { handleActions } from 'redux-actions'
import { locale, messages } from '../resources/intl'
import { updateIntl } from '../actions/intl'

const initialState = {
  locale,
  messages: messages[locale]
}

export default handleActions({
  [updateIntl] (state, action) {
    return {
      locale: action.payload,
      messages: messages[action.payload]
    }
  }
}, initialState)
