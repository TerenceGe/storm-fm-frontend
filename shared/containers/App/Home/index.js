/* @jsx */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { asyncConnect } from 'redux-connect'
import { connect } from 'react-redux'
import DailyTracks from 'components/DailyTracks'
import * as tracksActions from 'actions/tracks'
import * as modalActions from 'actions/modal'
import style from './style.css'

@connect(
  state => ({
    tracks: state.tracks,
    modal: state.modal
  }),
  dispatch => ({
    actions: bindActionCreators(modalActions, dispatch),
  })
)

@asyncConnect([{
  promise: ({ store }) =>
    store.dispatch(tracksActions.getTracksRequested([
      { page: 208, filter: 'popular' },
      { page: 210, filter: 'popular' },
      { page: 211, filter: 'popular' }
    ]))
}])

export default class Home extends Component {
  render() {
    return (
      <div className={style.home}>
        {
          this.props.tracks.get('data').map((dailyTracks, index) =>
            <DailyTracks
              key={index}
              date={dailyTracks.get('tracks').get(0).get('created_at')}
              tracks={dailyTracks.get('tracks')}
              showModal={this.props.actions.showModal}
            />
          )
        }
      </div>
    )
  }
}
