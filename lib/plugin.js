import { options } from './src/options'
import { cmsEngineStore } from './src/store'
import CmsEngineUtils from './core/utils'

const cmsEngine = () => {
  let _pageWrapper = null
  let _middlewares = {}
  let _getCmsConfigFn = () => null
  let _useCmsLayout = true

  return {
    set pageWrapper (viewer) {
      _pageWrapper = viewer
    },
    get pageWrapper () {
      return _pageWrapper
    },

    set middlewares (viewer) {
      _middlewares = viewer
    },
    get middlewares () {
      return _middlewares
    },

    set getCmsConfig (getCmsConfig) {
      _getCmsConfigFn = getCmsConfig
    },
    get getCmsConfig () {
      return _getCmsConfigFn
    },

    set useCmsLayout (value) {
      _useCmsLayout = value
    },
    get useCmsLayout () {
      return _useCmsLayout
    }
  }
}

export default function (context, inject) {
  const { store } = context

  if (!store) {
    throw new Error('Cms Engine: No store provided')
  }

  store.registerModule('cmsEngine', cmsEngineStore(), {
    preserveState: Boolean(store.state.cmsEngine)
  })

  store.commit('cmsEngine/setModuleOptions', options)

  inject('cmsEngine', cmsEngine())

  inject('cmsUrl', CmsEngineUtils.toUrl)
}
