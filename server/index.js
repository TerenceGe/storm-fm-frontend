/* global __webpack_hash__ */

import Express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import path from 'path'
import ConnectedIntlProvider from '../shared/components/ConnectedIntlProvider'
import configure from '../shared/store'
import routes from '../shared/routes'

const port = 8080
const app = new Express()
const store = configure()

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
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="/bundle.css?v=${__webpack_hash__}" rel="stylesheet">
  </head>
  <body>
    <div id="app">${root}</div>
    <script>window.__PRELOADED_STATE__ = ${JSON.stringify(state)}</script>
    <script src="/vendor.bundle.js?v=${__webpack_hash__}"></script>
    <script src="/bundle.js?v=${__webpack_hash__}"></script>
  </body>
  </html>
`

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
        const html = ReactDOMServer.renderToStaticMarkup(
          <Provider store={store}>
            <ConnectedIntlProvider>
              <RouterContext {...renderProps} />
            </ConnectedIntlProvider>
          </Provider>
        )
        const preloadedState = store.getState()
        res.status(200).send(renderFullPage(html, preloadedState))
      } else {
        res.status(404).send('Not found!')
      }
    }
  )
})

console.log(`Listening on port ${port}`)
app.listen(port)
