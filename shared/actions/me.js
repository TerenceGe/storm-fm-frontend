import { createAction } from 'redux-actions'

export const getCurrentUserRequested = createAction('current_user/GET_REQUESTED')
export const getCurrentUserSucceeded = createAction('current_user/GET_SUCCEEDED')
export const getCurrentUserFailed = createAction('current_user/GET_FAILED')
