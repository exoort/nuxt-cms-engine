import { getPageConfig } from './utils'

export const cmsEngineStore = () => ({
  namespaced: true,

  state: () => ({
    cmsConfig: null,
    moduleOptions: {},
    currentPageConfig: null
  }),

  actions: {
    async init ({ state, dispatch }, currentPath) {
      if (!state.cmsConfig) {
        await dispatch('getCmsConfig')
      }

      dispatch('getCurrentPageConfig', currentPath)
    },

    async getCmsConfig ({ commit }) {
      const cmsConfig = await this.$cmsEngine.getCmsConfig()
      commit('setCmsConfig', cmsConfig)
    },

    getCurrentPageConfig ({ state, commit }, currentPath) {
      commit('setCurrentPageConfig', getPageConfig(currentPath, state.cmsConfig))
    }
  },

  mutations: {
    setCmsConfig: (state, cmsConfig) => {
      state.cmsConfig = cmsConfig
    },

    setModuleOptions: (state, moduleOptions) => {
      state.moduleOptions = moduleOptions
    },

    setCurrentPageConfig: (state, currentPageConfig) => {
      state.currentPageConfig = currentPageConfig
    }
  },

  getters: {
    cmsConfig: state => state.cmsConfig,
    moduleOptions: state => state.moduleOptions,
    currentPageConfig: state => state.currentPageConfig,
    currentPageLayout: state => state.currentPageConfig?.config?.layout
  }
})
