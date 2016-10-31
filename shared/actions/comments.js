import { createAction } from 'redux-actions'

export const createCommentRequested = createAction('comments/CREATE_REQUESTED')
export const createCommentSucceeded = createAction('comments/CREATE_SUCCEEDED')
export const createCommentFailed = createAction('comments/CREATE_FAILED')
