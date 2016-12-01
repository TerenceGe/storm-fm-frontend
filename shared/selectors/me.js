export const getLoggedIn = state => !!state.me.get('data').size
export const getUsername = state => state.me.get('data').get('username')
