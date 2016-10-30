import { createAction } from 'redux-actions'

export const loginRequested = createAction('user/LOGIN_REQUESTED')
export const loginSucceeded = createAction('user/LOGIN_SUCCEEDED')
export const loginFailed = createAction('user/LOGIN_FAILED')
