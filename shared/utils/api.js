import fetch from 'isomorphic-fetch'
import es6promise from 'es6-promise'
import cookie from 'react-cookie'
import { API_URL } from 'constants/env'

es6promise.polyfill()

const fetchBase = (method = 'GET', endPoint = '/hello', params = {}) => {
  const token = cookie.load('token') || ''
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

export const login = ({ identity, password }) => fetchBase('POST', '/auth/login', { identity, password })

export const getCurrentUser = () => fetchBase('GET', '/me')

export const getTracks = ({ page, filter }) => fetchBase('GET', '/tracks', { page, filter })

export const getTrack = id => fetchBase('GET', `/tracks/${id}`)

export const createLike = ({ track_id }) => fetchBase('POST', '/likes', { track_id })

export const createComment = ({ track_id, parent_comment_id, body }) => fetchBase('POST', '/comments', { track_id, parent_comment_id, body })
