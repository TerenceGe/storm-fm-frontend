/* @jsx */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { IntlProvider, FormattedMessage } from 'react-intl'
import * as AuthActions from '../../actions/auth'
import * as ModalActions from '../../actions/modal'
import { getMessages } from '../../selectors/intl'
import { getLoggedIn, getUsername } from '../../selectors/me'
import LoginModal from '../../components/Modal/LoginModal'
import i18n from './messages'
import style from './style.css'

const Auth = ({ showModal }) => (
  <div className={style.auth}>
    <a onClick={showModal.bind(this, 'loginModal')}>
      <FormattedMessage id="header_button_login" />
    </a>
  </div>
)

const SoundWave = () => (
  <div className={style.soundwave}>
    <span /><span /><span />
  </div>
)

const Branding = () => (
  <Link to="/" className={style.branding}>
    <SoundWave />
    <div className={style.title}>
      <span>ST</span>
      <span>ORM</span>
      <span>FM</span>
      <span>.</span>
    </div>
  </Link>
)

@connect(
  state => ({
    auth: state.auth,
    modal: state.modal,
    loggedIn: getLoggedIn(state.me),
    username: getUsername(state.me),
    messages: getMessages(state.intl, i18n)
  }),
  dispatch => ({
    actions: bindActionCreators({ ...AuthActions, ...ModalActions }, dispatch)
  })
)

export default class Header extends Component {
  render() {
    const { loggedIn, username, auth, modal, messages, actions } = this.props

    return (
      <IntlProvider messages={messages}>
        <header className={style.header}>
          <div className={style.container}>
            <Branding />
            {
              loggedIn ? <div className={style.userInfo}>{username}</div> : <div>
                <Auth showModal={actions.showModal} />
                <LoginModal
                  modal={modal}
                  loginRequested={actions.loginRequested}
                  hideModal={actions.hideModal}
                  auth={auth}
                />
              </div>
            }
          </div>
        </header>
      </IntlProvider>
    )
  }
}
