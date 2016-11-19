/* @jsx */

import React, { Component } from 'react'
import cookie from 'react-cookie'
import 'normalize.css'
import '../../resources/fonts/fonts.css'
import style from './style.css'
import Header from '../../components/Header'
import * as MeActions from '../../actions/me'

export default class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <div className={style.appContainer}>
          <Header />
          {this.props.children}
        </div>
      </div>
    )
  }
}
