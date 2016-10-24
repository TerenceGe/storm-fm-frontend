import { createAction } from 'redux-actions'

export const getTracksRequested = createAction('get tracks requested')
export const getTracksSucceeded = createAction('get tracks succeeded')
export const getTracksFailed = createAction('get tracks failed')
