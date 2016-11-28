import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { getMessages } from '../../../selectors/intl'
import i18n from './messages'
import style from './style.css'

@connect(
  state => ({
    messages: getMessages(state.intl, i18n)
  })
)

export default class Tracks extends Component {
  render() {
    return (
      <IntlProvider messages={this.props.messages}>
        <div className={style.tracks}>
          <FormattedMessage id="tracks_head_title" />
        </div>
      </IntlProvider>
    )
  }
}
