/* @jsx */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from '../../actions/auth'
import LoginModal from '../Modal/LoginModal'
import style from './style.css'

const Auth = () => (
  <div className={style.auth}>
    <a>login</a>
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
  state => ({ auth: state.auth }),
  dispatch => ({
    actions: bindActionCreators(AuthActions, dispatch)
  })
)

export default class Header extends Component {
  render() {
    const { auth } = this.props
    const loggedin = !!auth.get('data').get('token')
    return (
      <header className={style.header}>
        <div className={style.container}>
          <Branding />
          {
            loggedin ? <div>{auth.get('data').get('username')}</div> : <div><Auth /><LoginModal /></div>
          }
        </div>
      </header>
    )
  }
}
