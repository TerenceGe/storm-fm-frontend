/* @jsx */

import React from 'react'
import style from './style'

export const Modal = ({ children, title }) => (
  <div className={style.background}>
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.title}>{title}</div>
        <div className={style.close}>x</div>
        {children}
      </div>
    </div>
  </div>
)
