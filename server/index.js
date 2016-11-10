/* @jsx */
/* global __webpack_hash__ */

import path from 'path'
import Express from 'express'
import cookieParser from 'cookie-parser'
import React from 'react'
import cookie from 'react-cookie'
import ReactDOMServer from 'react-dom/server'
import { match } from 'react-router'
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'
import Transit from 'transit-immutable-js'
import Provider from '../shared/components/Provider'
import configure from '../shared/store'
import routes from '../shared/routes'
import sagas from '../shared/sagas'

const port = 8080
const app = new Express()

const renderFullPage = (root, state) => `
  <!DOCTYPE html>
  <!--[if lt IE 7 ]> <html lang="en" class="ie6"> <![endif]-->
  <!--[if IE 7 ]>    <html lang="en" class="ie7"> <![endif]-->
  <!--[if IE 8 ]>    <html lang="en" class="ie8"> <![endif]-->
  <!--[if IE 9 ]>    <html lang="en" class="ie9"> <![endif]-->
  <!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class=""> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <title>Storm FM</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
    <link rel="shortcut icon" href="https://s3.amazonaws.com/storm-fm/favicon.png">
    <link href="/bundle.css?v=${__webpack_hash__}" rel="stylesheet">
  </head>
  <body>
    <div id="app">${root}</div>
    <script>window.__PRELOADED_STATE__ = ${JSON.stringify(Transit.toJSON(state))}</script>
    <script src="/vendor.bundle.js?v=${__webpack_hash__}"></script>
    <script src="/bundle.js?v=${__webpack_hash__}"></script>
  </body>
  </html>
`

app.use(cookieParser())

app.use('/fonts', Express.static(path.join(__dirname, '/fonts')))

app.use('/images', Express.static(path.join(__dirname, '/images')))

app.get('/bundle.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'bundle.css'))
})

app.get('/vendor.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'vendor.bundle.js'))
})

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'bundle.js'))
})

app.use((req, res) => {
  match({ routes, location: req.url },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        cookie.setRawCookie(req.headers.cookie)
        const store = configure()
        const rootTask = store.runSaga(sagas)
        loadOnServer({ ...renderProps, store }).then(() => {
          store.close()
          rootTask.done.then(() => {
            const html = ReactDOMServer.renderToStaticMarkup(
              <Provider store={store}>
                <ReduxAsyncConnect {...renderProps} />
              </Provider>
            )
            const preloadedState = store.getState()
            res.status(200).send(renderFullPage(html, preloadedState))
          })
        })
      } else {
        res.redirect('/')
      }
    }
  )
})

console.log(`Listening on port ${port}`)
app.listen(port)
