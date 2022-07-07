<script>
import CmsEngineUtils from '../core/utils'
import CmsEnginePage from './CmsEnginePage'

async function getPageConfig (context) {
  await context.store.dispatch('cmsEngine/init', context.route.path)

  return context.store.getters['cmsEngine/currentPageConfig']
}

function setRouteParams (context, pageConfig) {
  const params = CmsEngineUtils.getRouteParams(context.route.path, pageConfig.url)

  for (const paramsKey in params) {
    context.route.params[paramsKey] = params[paramsKey]
  }
}

function getLayoutName (store) {
  const name = store.getters['cmsEngine/useCmsLayout']
    ? 'cms'
    : store.getters['cmsEngine/currentPageLayout']

  return name || 'cms'
}

function setLayoutOnServer (context) {
  if (process.server) {
    context.ssrContext.nuxt.layout = getLayoutName(context.store)
  }
}

function triggerMiddlewares (context, pageConfig) {
  const middlewares = context.$cmsEngine.middlewares || {}

  const pageMiddleware = pageConfig?.config?.middleware

  const callMiddleware = (middlewareName) => {
    const middleware = middlewares[middlewareName]
    if (middleware) {
      middleware(context)
    }
  }

  if (pageMiddleware) {
    if (Array.isArray(pageMiddleware)) {
      pageMiddleware.forEach((middlewareName) => {
        callMiddleware(middlewareName)
      })
    } else {
      callMiddleware(pageMiddleware)
    }
  }
}

export default {
  name: 'CmsEnginePageLoader',
  components: { CmsEnginePage },
  layout ({ store }) {
    return getLayoutName(store)
  },
  async middleware (context) {
    const pageConfig = await getPageConfig(context)

    if (!pageConfig) {
      return context.error({
        statusCode: 404
      })
    }

    setRouteParams(context, pageConfig)

    setLayoutOnServer(context)

    triggerMiddlewares(context, pageConfig)
  },
  asyncData (context) {
    return {
      cachedRouteParams: process.server ? context.route.params : {},
      pageConfig: context.store.getters['cmsEngine/currentPageConfig'],
      viewerKey: context.route.path
    }
  },
  data () {
    return {
      cachedRouteParams: {},
      pageConfig: null,
      viewerKey: null
    }
  },
  head () {
    return this.seo
  },
  created () {
    this.regenerateRouteParams()
  },
  methods: {
    regenerateRouteParams () {
      if (!this.cachedRouteParams || !Object.keys(this.cachedRouteParams).length) {
        return
      }

      for (const param in this.cachedRouteParams) {
        this.$route.params[param] = this.cachedRouteParams[param]
      }
    }
  }
}
</script>

<template>
  <CmsEnginePage
    v-if="pageConfig"
    :key="viewerKey"
  />
</template>
