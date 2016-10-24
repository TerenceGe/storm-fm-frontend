/* @jsx */

import React from 'react'
import style from './style.css'
import LikeIcon from '../../resources/icons/LikeIcon'
import CommentIcon from '../../resources/icons/CommentIcon'

const Track = ({ title, artist, description, like_count, comment_count, artwork, source }) => (
  <div className={style.track}>
    <div className={style.leftContainer}>
      <img role="presentation" src={artwork.url} />
    </div>
    <div className={style.mainContainer}>
      <a className={style.info} href={source.url} rel="noopener noreferrer" target="_blank">
        {`${artist.name} - ${title}`}
      </a>
      <div className={style.description}>{description}</div>
    </div>
    <div className={style.rightContainer}>
      <a className={style.comments}>
        <div className={style.icon}>
          <CommentIcon />
        </div>
        <div className={style.count}>{comment_count}</div>
      </a>
      <a className={style.likes}>
        <div className={style.icon}>
          <LikeIcon />
        </div>
        <div className={style.count}>{like_count}</div>
      </a>
    </div>
  </div>
)

export default Track
