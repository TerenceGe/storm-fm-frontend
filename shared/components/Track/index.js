/* @jsx */

import React from 'react'
import { Link } from 'react-router'
import Lazyload from 'react-lazy-load'
import LikeIcon from 'resources/icons/LikeIcon'
import CommentIcon from 'resources/icons/CommentIcon'
import style from './style.css'

const Track = ({ data, showModal }) => (
  <div className={style.track}>
    <div className={style.leftContainer}>
      <Lazyload>
        <img role="presentation" src={data.get('artwork').get('url')} />
      </Lazyload>
    </div>
    <div className={style.mainContainer}>
      <div key="info" className={style.info}>
        <a href={data.get('source').get('url')} rel="noopener noreferrer" target="_blank">
          {`${data.get('artist').get('name')} - ${data.get('title')}`}
        </a>
      </div>
      <div key="description" className={style.description}>{data.get('description')}</div>
    </div>
    <div className={style.rightContainer}>
      <Link to="/tracks" className={style.comments}>
        <div className={style.icon}>
          <CommentIcon />
        </div>
        <div className={style.count}>{data.get('comment_count')}</div>
      </Link>
      <a className={style.likes} onClick={showModal.bind(this, 'loginModal')}>
        <div className={style.icon}>
          <LikeIcon />
        </div>
        <div className={style.count}>{data.get('like_count')}</div>
      </a>
    </div>
  </div>
)

export default Track
