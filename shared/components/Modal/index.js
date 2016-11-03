/* @jsx */

import React from 'react'
import style from './style.css'

const Modal = ({ children, title }) => (
  <div className={style.background}>
    <div className={style.container}>
      <div className={style.modal}>
        <div className={style.header}>
          <div className={style.title}>{title}</div>
          <div className={style.close}>x</div>
        </div>
        <div className={style.body}>
          {children}
        </div>
      </div>
    </div>
  </div>
)

export default Modal
