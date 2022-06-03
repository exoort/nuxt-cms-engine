<script>
import { getRouteParams } from './utils'

async function getPageConfig (context) {
  await context.store.dispatch('cmsEngine/init', context.route.path)

  return context.store.getters['cmsEngine/currentPageConfig']
}

function setRouteParams (context, pageConfig) {
  const params = getRouteParams(context.route.path, pageConfig.url)

  for (const paramsKey in params) {
    context.route.params[paramsKey] = params[paramsKey]
  }
}

function setLayoutOnServer (context) {
  if (process.server) {
    context.ssrContext.nuxt.layout = context.store.getters['cmsEngine/currentPageLayout'] || 'default'
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
  name: 'CmsPageLoader',
  layout ({ store }) {
    return store.getters['cmsEngine/currentPageLayout'] || 'default'
  },
  async middleware (context) {
    const pageConfig = await getPageConfig(context)

    if (!pageConfig) {
      context.error({
        statusCode: 404
      })

      return false
    }

    setRouteParams(context, pageConfig)

    setLayoutOnServer(context)

    triggerMiddlewares(context, pageConfig)
  },
  asyncData (context) {
    return {
      cachedRouteParams: process.server ? context.route.params : {}
    }
  },
  data () {
    return {
      cachedRouteParams: {}
    }
  },
  head () {
    return this.seo
  },
  computed: {
    cmsConfig () {
      return this.$store.getters['cmsEngine/cmsConfig']?.config
    },
    pageConfig () {
      return this.$store.getters['cmsEngine/currentPageConfig']
    },
    pageViewer () {
      return this.$cmsEngine.viewer
    },
    structure () {
      return this.pageConfig?.structure || []
    },
    css () {
      return this.pageConfig?.css || {}
    },
    env () {
      return this.cmsConfig?.env || {}
    },
    colors () {
      return this.cmsConfig?.colors || {}
    },
    seo () {
      return this.cmsConfig?.seo || {}
    }
  },
  created () {
    this.regenerateRouteParams()
  },
  methods: {
    regenerateRouteParams () {
      if (!process.client || !this.cachedRouteParams || !Object.keys(this.cachedRouteParams).length) {
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
  <component
    :is="pageViewer"
    v-if="pageConfig && pageViewer"
    :structure="structure"
    :env="env"
    :colors="colors"
    :css="css"
  />
</template>
