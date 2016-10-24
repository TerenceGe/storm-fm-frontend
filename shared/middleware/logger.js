export default store => next => action => { // eslint-disable-line no-unused-vars, arrow-parens
  console.log(store.getState())
  console.log(action)
  return next(action)
}
