/* @jsx */

import React, { Component } from 'react'
import cookie from 'react-cookie'
import { asyncConnect } from 'redux-connect'
import 'normalize.css'
import '../../resources/fonts/style.css'
import style from './style.css'
import Header from '../../components/Header'
import * as meActions from '../../actions/me'

@asyncConnect([{
  promise: ({ store }) => {
    if (!cookie.load('token')) return
    store.dispatch(meActions.getCurrentUserRequested())
  }
}])

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
