const { readdirSync } = require('fs')
const { resolve, join } = require('path')

/**
 * @function
 * @type {ICacheModule}
 * @param {ModuleOptions} moduleOptions
 */
module.exports = function (moduleOptions) {
  const defaultOptions = {
    route: {
      name: 'cmsPage',
      path: '*'
    }
  }

  const options = {
    ...defaultOptions,
    ...this.options.cmsEngine,
    ...moduleOptions
  }

  this.nuxt.options.alias['~cmsEngine'] = __dirname
  this.nuxt.options.build.transpile.push(__dirname)

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'cmsEngine/index.js',
    options
  })

  this.addLayout({
    name: 'cms',
    src: resolve(__dirname, 'src/cms.vue')
  })

  // sync all of the files and folders to revelant places in the nuxt build dir (.nuxt/)
  const foldersToSync = ['src', 'core']
  for (const pathString of foldersToSync) {
    const path = resolve(__dirname, pathString)
    for (const file of readdirSync(path)) {
      this.addTemplate({
        src: resolve(path, file),
        fileName: join('cmsEngine', pathString, file),
        options
      })
    }
  }

  if (options.route) {
    this.options.router.extendRoutes = (routes, resolve) => {
      routes.push(
        {
          // It must always in the end of the array
          name: options.route.name,
          path: options.route.path,
          component: resolve(__dirname, 'src/CmsEnginePageLoader.vue')
        }
      )
    }
  }
}

module.exports.meta = require('../package.json')
