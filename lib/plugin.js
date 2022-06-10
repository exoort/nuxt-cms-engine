import {options} from "./src/options";
import {cmsEngineStore} from "./src/store";
import CmsEngineUtils from "./core/utils";

const cmsEngine = () => {
  let _viewer = null
  let _middlewares = {}
  let _getCmsConfigFn = () => null
  let _useCmsLayout = true

  return {
    set viewer(viewer) {
      _viewer = viewer
    },
    get viewer() {
      return _viewer
    },

    set middlewares(viewer) {
      _middlewares = viewer
    },
    get middlewares() {
      return _middlewares
    },

    set getCmsConfig(getCmsConfig) {
      _getCmsConfigFn = getCmsConfig
    },
    get getCmsConfig() {
      return _getCmsConfigFn
    },

    set useCmsLayout(value) {
      _useCmsLayout = value
    },
    get useCmsLayout() {
      return _useCmsLayout
    },
  }
}

export default async function (context, inject) {
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

