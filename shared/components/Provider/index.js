/* @jsx */
import React from 'react'
import { connect, Provider as ReduxProvider } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'

addLocaleData(en)
addLocaleData(zh)

const mapStateToProps = (state) => {
  const intl = state.get('intl').toJS()

  return {
    ...intl,
    key: intl.locale
  }
}

const ConnectedIntlProvider = connect(mapStateToProps)(IntlProvider)

const Provider = ({ store, children }) => (
  <ReduxProvider store={store}>
    <ConnectedIntlProvider>
      {children}
    </ConnectedIntlProvider>
  </ReduxProvider>
)

export default Provider
