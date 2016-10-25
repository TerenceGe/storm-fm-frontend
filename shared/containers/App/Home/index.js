/* @jsx */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DailyTracks from '../../../components/DailyTracks'
import * as TracksActions from '../../../actions/tracks'
import style from './style.css'

class Home extends Component {
  componentDidMount() {
    this.props.actions.getTracksRequested({ page: 0, filter: 'popular' })
  }

  render() {
    return (
      <div className={style.home}>
        {
          this.props.tracks.data.map(dailyTracks =>
            !!dailyTracks.count && <DailyTracks date={dailyTracks.date} tracks={dailyTracks.tracks} />
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tracks: state.tracks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TracksActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)