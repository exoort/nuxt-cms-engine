import testMiddleware from '../middleware/testMiddleware'

export default function ({ $cmsEngine, $axios }) {
  // $cmsEngine.viewer = 'CmsPageWrapper'
  $cmsEngine.middlewares = {
    testMiddleware
  }
  $cmsEngine.getCmsConfig = () => new Promise((resolve) => {
    setTimeout(async () => {
      const config = await $axios.$get('/config/config.json')
      resolve(config)
    }, 500)
  })

  $cmsEngine.useCmsLayout = true
}
