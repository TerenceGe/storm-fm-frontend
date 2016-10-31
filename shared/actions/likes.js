import { createAction } from 'redux-actions'

export const createLikeRequested = createAction('likes/CREATE_REQUESTED')
export const createLikeSucceeded = createAction('likes/CREATE_SUCCEEDED')
export const createLikeFailed = createAction('likes/CREATE_FAILED')
