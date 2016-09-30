import { handleActions } from 'redux-actions'

import enLocales from '../resources/intl/en'
import zhLocales from '../resources/intl/zh'

const locales = {
  en: enLocales,
  zh: zhLocales
}

const initialLang = 'en'

const initialState = {
  lang: initialLang,
  messages: locales[initialLang]
}

export default handleActions({
  'change lang' (state, action) {
    return {
      lang: action.payload,
      messages: locales[action.payload]
    }
  }
}, initialState)
