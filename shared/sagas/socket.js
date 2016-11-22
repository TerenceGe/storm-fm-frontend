import { takeEvery } from 'redux-saga'
import { fork } from 'redux-saga/effects'
import io from 'socket.io-client'

let sioc

function initSocket() {
  console.log('initSocket')
  sioc = io('ws://localhost:81')
  sioc.on('open', () => {
    sioc.emit('subscribe')
    sioc.emit('ping')
  })
}

export default function* socketSaga() {
  yield fork(takeEvery, 'initSocket', initSocket)
}
