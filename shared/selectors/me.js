export const getLoggedIn = state => !!state.get('data').size
export const getUsername = state => state.get('data').get('username')
