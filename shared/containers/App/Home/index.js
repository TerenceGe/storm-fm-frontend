/* @jsx */

import React, { Component } from 'react'
import { asyncConnect } from 'redux-connect'
import { connect } from 'react-redux'
import DailyTracks from '../../../components/DailyTracks'
import * as TracksActions from '../../../actions/tracks'
import style from './style.css'

@asyncConnect([{
  promise: ({ store }) => store.dispatch({
    type: String(TracksActions.getTracksRequested),
    payload: { page: 30, filter: 'popular' }
  })
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
            <DailyTracks
              date={dailyTracks.get('tracks').get(0).get('created_at')}
              tracks={dailyTracks.get('tracks')}
            />
          )
        }
      </div>
    )
  }
}
