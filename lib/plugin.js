import {options} from "./src/options";
import {cmsEngineStore} from "./src/store";

const cmsEngine = () => {
  let _viewer = null
  let _middlewares = null
  let _getCmsConfigFn = null

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
}

