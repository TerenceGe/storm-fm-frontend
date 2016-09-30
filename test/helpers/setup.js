/* global document, window */

import Jsdom from 'jsdom'

global.document = Jsdom.jsdom('<body><div id="app"></div></body>')
global.window = document.defaultView
global.navigator = window.navigator
