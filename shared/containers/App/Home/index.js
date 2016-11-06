/* @jsx */

import React, { Component } from 'react'
import { asyncConnect } from 'redux-connect'
import { connect } from 'react-redux'
import DailyTracks from '../../../components/DailyTracks'
import * as TracksActions from '../../../actions/tracks'
import style from './style.css'

@asyncConnect([{
  promise: ({ store }) => Promise.all([
    store.dispatch({ type: String(TracksActions.getTracksRequested), payload: { page: 12, filter: 'popular' } }),
    store.dispatch({ type: String(TracksActions.getTracksRequested), payload: { page: 14, filter: 'popular' } }),
    store.dispatch({ type: String(TracksActions.getTracksRequested), payload: { page: 15, filter: 'popular' } })
  ])
}])

@connect(
  state => ({ tracks: state.tracks })
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
