import CmsEngineUtils from '../core/utils'

export const cmsEngineStore = () => ({
  namespaced: true,

  state: () => ({
    cmsConfig: null,
    moduleOptions: {},
    currentPageConfig: null,
    useCmsLayout: true
  }),

  actions: {
    async init ({ state, dispatch }, currentPath) {
      if (!state.cmsConfig) {
        dispatch('getUseCmsLayout')
        await dispatch('getCmsConfig')
      }

      dispatch('getCurrentPageConfig', currentPath)
    },

    getUseCmsLayout ({ commit }) {
      commit('setUseCmsLayout', this.$cmsEngine.useCmsLayout)
    },

    async getCmsConfig ({ commit }) {
      const cmsConfig = await this.$cmsEngine.getCmsConfig()

      commit('setCmsConfig', cmsConfig)
    },

    getCurrentPageConfig ({ state, commit }, currentPath) {
      commit('setCurrentPageConfig', CmsEngineUtils.getPageConfig(currentPath, state.cmsConfig))
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
    },

    setUseCmsLayout: (state, useCmsLayout) => {
      state.useCmsLayout = useCmsLayout
    }
  },

  getters: {
    cmsConfig: state => state.cmsConfig,
    moduleOptions: state => state.moduleOptions,
    currentPageConfig: state => state.currentPageConfig,
    currentPageLayout: state => state.currentPageConfig?.config?.layout,
    useCmsLayout: state => state.useCmsLayout
  }
})
