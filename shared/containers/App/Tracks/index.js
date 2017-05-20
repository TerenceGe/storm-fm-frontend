/* @jsx */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IntlProvider, FormattedMessage } from 'react-intl'
import messages from './messages'
import style from './style.css'

@connect(
  state => ({
    locale: state.intl.get('locale')
  })
)

export default class Tracks extends Component {
  render() {
    return (
      <IntlProvider messages={messages[this.props.locale]}>
        <div className={style.tracks}>
          <FormattedMessage id="tracks_head_title" />
        </div>
      </IntlProvider>
    )
  }
}
