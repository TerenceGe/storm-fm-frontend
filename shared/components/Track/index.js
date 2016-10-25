/* @jsx */

import React from 'react'
import style from './style.css'
import LikeIcon from '../../resources/icons/LikeIcon'
import CommentIcon from '../../resources/icons/CommentIcon'

const Track = ({ data }) => (
  <div className={style.track}>
    <div className={style.leftContainer}>
      <img role="presentation" src={data.get('artwork').get('url')} />
    </div>
    <div className={style.mainContainer}>
      <a className={style.info} href={data.get('source').get('url')} rel="noopener noreferrer" target="_blank">
        {`${data.get('artist').get('name')} - ${data.get('title')}`}
      </a>
      <div className={style.description}>{data.get('description')}</div>
    </div>
    <div className={style.rightContainer}>
      <a className={style.comments}>
        <div className={style.icon}>
          <CommentIcon />
        </div>
        <div className={style.count}>{data.get('comment_count')}</div>
      </a>
      <a className={style.likes}>
        <div className={style.icon}>
          <LikeIcon />
        </div>
        <div className={style.count}>{data.get('like_count')}</div>
      </a>
    </div>
  </div>
)

export default Track
