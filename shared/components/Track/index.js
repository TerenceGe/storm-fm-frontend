/* @jsx */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import style from './style.css'
import * as ModalActions from '../../actions/modal'
import LikeIcon from '../../resources/icons/LikeIcon'
import CommentIcon from '../../resources/icons/CommentIcon'

@connect(
  state => ({ modal: state.modal }),
  dispatch => ({
    actions: bindActionCreators(ModalActions, dispatch)
  })
)

export default class Track extends Component {
  render() {
    const { data, actions } = this.props

    return (
      <div className={style.track}>
        <div className={style.leftContainer}>
          <img role="presentation" src={data.get('artwork').get('url')} />
        </div>
        <div className={style.mainContainer}>
          <div className={style.info}>
            <a href={data.get('source').get('url')} rel="noopener noreferrer" target="_blank">
              {`${data.get('artist').get('name')} - ${data.get('title')}`}
            </a>
          </div>
          <div className={style.description}>{data.get('description')}</div>
        </div>
        <div className={style.rightContainer}>
          <a className={style.comments}>
            <div className={style.icon}>
              <CommentIcon />
            </div>
            <div className={style.count}>{data.get('comment_count')}</div>
          </a>
          <a className={style.likes} onClick={actions.showModal.bind(this, 'loginModal')}>
            <div className={style.icon}>
              <LikeIcon />
            </div>
            <div className={style.count}>{data.get('like_count')}</div>
          </a>
        </div>
      </div>
    )
  }
}
