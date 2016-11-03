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
      'Content-Type': 'application/json'
    }
  }

  if (token) options.headers.Authorization = `Bearer ${token}`

  if (method === 'GET') {
    const queryString = `?${Object.keys(params).map(k => [k, params[k]].map(encodeURIComponent).join('=')).join('&')}`
    url += queryString
  } else {
    options.body = JSON.stringify(params)
  }

  return fetch(url, options).then((res) => {
    if (!res.ok) {
      return res.json().then(e => Promise.reject(e))
    }
    return res.json()
  })
}

export const login = ({ identity, password }) => fetchBase('/auth/login', 'POST', { identity, password })

export const getTracks = ({ page, filter }) => fetchBase('/tracks', 'GET', { page, filter })

export const getTrack = id => fetchBase(`/tracks/${id}`, 'GET')

export const createLike = ({ track_id }) => fetchBase('/likes', 'POST', { track_id })

export const createComment = ({ track_id, parent_comment_id, body }) => fetchBase('/comments', 'POST', { track_id, parent_comment_id, body })
