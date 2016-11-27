/* @jsx */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { asyncConnect } from 'redux-connect'
import { connect } from 'react-redux'
import DailyTracks from '../../../components/DailyTracks'
import * as TracksActions from '../../../actions/tracks'
import * as ModalActions from '../../../actions/modal'
import style from './style.css'

@asyncConnect([{
  promise: ({ store }) => store.dispatch({
    type: String(TracksActions.getTracksRequested),
    payload: { page: 33, filter: 'popular' }
  })
}])

@connect(
  state => ({
    tracks: state.tracks,
    modal: state.modal
  }),
  dispatch => ({
    actions: bindActionCreators(ModalActions, dispatch),
  })
)

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
