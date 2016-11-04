/* @jsx */

import React from 'react'
import classNames from 'classnames'
import style from './style.css'

const Modal = ({ children, isOpen, hide, title }) => {
  const baseClass = classNames({
    [style.background]: true,
    [style.shown]: isOpen,
    [style.hidden]: !isOpen
  })

  return (
    <div className={baseClass}>
      <div className={style.container}>
        <div className={style.modal}>
          <div className={style.header}>
            <div className={style.title}>{title}</div>
            <div className={style.close} onClick={hide}>x</div>
          </div>
          <div className={style.body}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
