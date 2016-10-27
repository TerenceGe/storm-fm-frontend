import { createAction } from 'redux-actions'

export const getTracksRequested = createAction('tracks/GET_REQUESTED')
export const getTracksSucceeded = createAction('tracks/GET_SUCCEEDED')
export const getTracksFailed = createAction('tracks/GET_FAILED')
