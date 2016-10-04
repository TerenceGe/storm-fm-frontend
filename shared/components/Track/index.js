/* @jsx */

import React from 'react'
import style from './style.css'
import LikeIcon from '../../resources/icons/LikeIcon'
import CommentIcon from '../../resources/icons/CommentIcon'

const Track = ({ name, artist, description, likes, comments, coverUrl, sourceUrl }) => (
  <div className={style.track}>
    <div className={style.leftContainer}>
      <img role="presentation" src={coverUrl} />
    </div>
    <div className={style.mainContainer}>
      <a className={style.info} href={sourceUrl} rel="noopener noreferrer" target="_blank">
        {`${artist} - ${name}`}
      </a>
      <div className={style.description}>{description}</div>
    </div>
    <div className={style.rightContainer}>
      <a className={style.comments}>
        <div className={style.icon}>
          <CommentIcon />
        </div>
        <div className={style.count}>{comments}</div>
      </a>
      <a className={style.likes}>
        <div className={style.icon}>
          <LikeIcon />
        </div>
        <div className={style.count}>{likes}</div>
      </a>
    </div>
  </div>
)

export default Track
