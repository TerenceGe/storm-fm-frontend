import App from 'containers/App'
import { errorLoading } from 'utils/error'

const loadRoute = cb => (module) => {
  cb(null, module.default)
}

export default {
  component: App,
  childRoutes: [
    {
      path: '/',
      getComponent(location, cb) {
        System.import('containers/App/Home')
          .then(loadRoute(cb))
          .catch(errorLoading)
      }
    },
    {
      path: 'tracks',
      getComponent(location, cb) {
        System.import('containers/App/Tracks')
          .then(loadRoute(cb))
          .catch(errorLoading)
      }
    }
  ]
}
