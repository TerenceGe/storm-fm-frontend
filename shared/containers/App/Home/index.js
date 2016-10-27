/* @jsx */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { asyncConnect } from 'redux-connect'
import { connect } from 'react-redux'
import DailyTracks from '../../../components/DailyTracks'
import * as TracksActions from '../../../actions/tracks'
import style from './style.css'

@asyncConnect([{
  promise: ({ store }) => Promise.all([
    store.dispatch({ type: String(TracksActions.getTracksRequested), payload: { page: 2, filter: 'popular' } }),
    store.dispatch({ type: String(TracksActions.getTracksRequested), payload: { page: 3, filter: 'popular' } }),
    store.dispatch({ type: String(TracksActions.getTracksRequested), payload: { page: 4, filter: 'popular' } }),
    store.dispatch({ type: String(TracksActions.getTracksRequested), payload: { page: 5, filter: 'popular' } })])
}])

@connect(
  state => ({ tracks: state.tracks }),
  dispatch => ({
    actions: bindActionCreators(TracksActions, dispatch)
  })
)

export default class Home extends Component {
  render() {
    return (
      <div className={style.home}>
        {
          this.props.tracks.get('data').map(dailyTracks =>
            !!dailyTracks.get('count') && <DailyTracks date={dailyTracks.get('date')} tracks={dailyTracks.get('tracks')} />
          )
        }
      </div>
    )
  }
}
