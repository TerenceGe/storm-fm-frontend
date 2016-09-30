import React from 'react'
import { FormattedDate } from 'react-intl'
import style from './style.css'
import Track from '../Track'

const DailyTracks = ({ date, tracks }) => (
  <div className={style.dailyTracks}>
    <div className={style.dateContainer}>
      <div className={style.date}>
        <FormattedDate
          value={new Date(date)}
          month="long"
          weekday="long"
          day="numeric"
        />
      </div>
    </div>
    <div>
      {
        tracks.map(track => <Track {...track} />)
      }
    </div>
  </div>
)

export default DailyTracks
