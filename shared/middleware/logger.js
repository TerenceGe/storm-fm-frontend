
export default store => next => (action) => {
  console.log(store.getState())
  console.log(action)
  return next(action)
}
