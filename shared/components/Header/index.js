/* @jsx */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from '../../actions/auth'
import * as ModalActions from '../../actions/modal'
import LoginModal from '../../components/Modal/LoginModal'
import style from './style.css'

const Auth = ({ showModal }) => (
  <div className={style.auth}>
    <a onClick={showModal.bind(this, 'loginModal')}>login</a>
  </div>
)

const SoundWave = () => (
  <div className={style.soundwave}>
    <span /><span /><span />
  </div>
)

const Branding = () => (
  <a className={style.branding}>
    <SoundWave />
    <div className={style.title}>
      <span>ST</span>
      <span>ORM</span>
      <span>FM</span>
      <span>.</span>
    </div>
  </a>
)

@connect(
  state => ({ auth: state.auth, modal: state.modal }),
  dispatch => ({
    actions: bindActionCreators({ ...AuthActions, ...ModalActions }, dispatch)
  })
)

export default class Header extends Component {
  render() {
    const { auth, modal, actions } = this.props
    const loggedIn = !!auth.get('data').get('token')

    return (
      <header className={style.header}>
        <div className={style.container}>
          <Branding />
          {
            loggedIn ? <div className={style.userInfo}>{auth.get('data').get('username')}</div> : <div>
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
    )
  }
}
