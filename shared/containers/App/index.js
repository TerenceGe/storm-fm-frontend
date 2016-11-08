/* @jsx */

import React from 'react'
import 'normalize.css'
import '../../resources/fonts/fonts.css'
import style from './style.css'
import Header from '../../components/Header'

const App = ({ children }) => (
  <div className={style.app}>
    <div className={style.appContainer}>
      <Header />
      {children}
    </div>
  </div>
)

export default App
