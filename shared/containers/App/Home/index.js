
import React from 'react'
import DailyTracks from '../../../components/DailyTracks'
import style from './style.css'
import data from '../../../resources/data'

const Home = () => (
  <div className={style.home}>
    {
      data.content.map(dailyTracks =>
        <DailyTracks date={dailyTracks.date} tracks={dailyTracks.tracks} />
      )
    }
  </div>
)

export default Home
