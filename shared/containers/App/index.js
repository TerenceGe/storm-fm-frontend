/* react@jsx */

import React from 'react'
import '../../resources/fonts/fonts.css'
import Header from '../../components/Header'
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
