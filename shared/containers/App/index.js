/* @jsx */

import React from 'react'
import Header from '../../components/Header'
import '../../resources/fonts/fonts.css'
import style from './style.css'

const App = ({ children }) => (
  <div className={style.app}>
    <div className={style.appContainer}>
      <Header />
      {children}
    </div>
  </div>
)

export default App
