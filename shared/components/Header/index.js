import React from 'react'
import style from './style.css'

const Auth = () => (
  <div className={style.auth}>
    <a>sign in</a>
  </div>
)

const SoundWave = () => (
  <div className={style.soundwave}>
    <span /><span /><span />
  </div>
)

const Branding = () => (
  <a className={style.branding}>
    <SoundWave />
    <div className={style.title}>
      <span>S</span>
      <span>TORM</span>
      <span>FM</span>
      <span>.</span>
    </div>
  </a>
)

const Header = () => (
  <header className={style.header}>
    <div className={style.container}>
      <Branding />
      <Auth />
    </div>
  </header>
)

export default Header
