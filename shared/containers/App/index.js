/* @jsx */

import React, { Component } from 'react'
import cookie from 'react-cookie'
import { asyncConnect } from 'redux-connect'
import * as meActions from 'actions/me'
import style from './style.css' // eslint-disable-line import/imports-first
import Header from 'components/Header' // eslint-disable-line import/imports-first

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
