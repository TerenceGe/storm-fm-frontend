import fetch from 'isomorphic-fetch'
import es6promise from 'es6-promise'
import cookie from 'react-cookie'
import { API_URL } from '../constants/env'

es6promise.polyfill()

const fetchBase = (endPoint = '/hello', method = 'GET', body = {}) => {
  const token = cookie.load('sf_jwt') || ''
  return fetch(`${API_URL}${endPoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body
  }).then((res) => {
    if (res.status >= 400) Promise.reject(res.json())
    return res.json()
  })
}

export const getTracks = ({ page, filter }) => fetchBase(`/tracks?page=${page}&filter=${filter}`, 'GET')
