/* @jsx */

import React from 'react'
import { FormattedDate } from 'react-intl'
import Track from '../Track'
import style from './style.css'

const DailyTracks = ({ date, tracks }) => (
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
      {tracks.map(track => <Track data={track} />)}
    </div>
  </div>
)

export default DailyTracks
