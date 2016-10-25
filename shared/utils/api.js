import fetch from 'isomorphic-fetch'
import es6promise from 'es6-promise'
import cookie from 'react-cookie'
import { API_URL } from '../constants/env'

es6promise.polyfill()

const fetchBase = (endPoint = '/hello', method = 'GET', params = {}) => {
  const token = cookie.load('sf_jwt') || ''
  let url = API_URL + endPoint

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  if (method === 'GET') {
    const queryString = `?${Object.keys(params).map(k => [k, params[k]].map(encodeURIComponent).join('=')).join('&')}`
    url += queryString
  } else {
    options.body = params
  }

  return fetch(url, options).then((res) => {
    if (res.status >= 400) Promise.reject(res.json())
    return res.json()
  })
}

export const getTracks = ({ page, filter }) => fetchBase('/tracks', 'GET', { page, filter })

export const getTrack = id => fetchBase(`/tracks/${id}`, 'GET')
