/* @jsx */

import React, { Component } from 'react'
import cookie from 'react-cookie'
import { asyncConnect } from 'redux-connect'
import { spring, presets } from 'react-motion'
import { RouteTransition } from 'react-router-transition'
import 'normalize.css'
import '../../resources/fonts/style.css'
import style from './style.css'
import Header from '../../components/Header'
import * as MeActions from '../../actions/me'

@asyncConnect([{
  promise: ({ store }) => {
    if (!cookie.load('token')) return
    store.dispatch({
      type: String(MeActions.getCurrentUserRequested)
    })
  }
}])

export default class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <div className={style.appContainer}>
          <Header />
          <RouteTransition
            pathname={this.props.location.pathname}
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: spring(0, { ...presets.gentle, precision: 0.1 }) }}
            atActive={{ opacity: spring(1, { ...presets.gentle, precision: 0.1 }) }}
          >
            {this.props.children}
          </RouteTransition>
        </div>
      </div>
    )
  }
}
