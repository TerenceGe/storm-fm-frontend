/* @jsx */

import React from 'react'
import { FormattedDate } from 'react-intl'
import Track from '../../components/Track'
import style from './style.css'

const DailyTracks = ({ date, tracks, showModal }) => (
  <div className={style.dailyTracks}>
    <div className={style.dateContainer}>
      <div className={style.date}>
        <FormattedDate
          value={new Date(date)}
          month="long"
          day="numeric"
          weekday="long"
        />
      </div>
    </div>
    <div>
      {tracks.map((track, index) => <Track key={index} data={track} showModal={showModal} />)}
    </div>
  </div>
)

export default DailyTracks
