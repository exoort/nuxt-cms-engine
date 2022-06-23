function checkIsObject (value) {
  return !(value instanceof Date) && !Array.isArray(value) && !Object.is(value, null) && !Object.is(value, undefined) && !(value instanceof Function)
}

export default class CmsEngineUtils {
  /**
   *
   * @param {string} url
   * @param {ICms} config
   * @returns {ICmsPage|null}
   */
  static getPageConfig (url, config) {
    const pages = config.pages
    let searched = pages[url]

    if (!searched) {
      const splittedUrl = url.split('/')
      if (splittedUrl[splittedUrl.length - 1] === '') {
        splittedUrl.pop()
      }

      for (const pageUrl in pages) {
        const detectBy = pages[pageUrl].detectBy
        const pageUrlSplitted = pageUrl.split('/')
        let matchedCount = 0

        splittedUrl.forEach((part) => {
          if (detectBy.includes(part)) {
            matchedCount += 1
          }
        })

        if (matchedCount === detectBy.length && splittedUrl.length === pageUrlSplitted.length) {
          searched = pages[pageUrl]
        }
      }
    }

    return searched || null
  }

  /**
   *
   * @param {string} url
   * @param {string} cmsUrl
   * @returns {Record<string, string>}
   */
  static getRouteParams (url, cmsUrl) {
    const splittedCmsUrl = cmsUrl.split('/')
    const splittedUrl = url.split('/')

    const params = {}

    splittedCmsUrl.forEach((part, index) => {
      if (part[0] === ':') {
        const paramName = part.slice(1)

        params[paramName] = splittedUrl[index]
      }
    })

    return params
  }

  /**
   *
   * @param {string} url
   * @returns {string[]}
   */
  static getDetectBy (url) {
    const detectBy = []

    const urlParts = url.split('/')

    for (const urlPart of urlParts) {
      if (urlPart[0] !== ':' && urlPart !== '') {
        detectBy.push(urlPart)
      }
    }

    return detectBy
  }

  /**
   *
   * @returns {ICmsPage}
   */
  static getDefaultPage () {
    const newPageUrl = `/page-${Date.now()}`

    return {
      url: newPageUrl,
      detectBy: CmsEngineUtils.getDetectBy(newPageUrl),
      css: {
        styles: {}
      },
      structure: [],
      config: {
        layout: 'default',
        middleware: [],
        seo: {
          title: 'Example',
          meta: [],
          script: [],
          link: []
        },
        entities: ''
      }
    }
  }

  /**
   *
   * @returns {ICms}
   */
  static getDefaultCmsFile () {
    return {
      pages: {},
      config: {
        colors: {},
        env: {}
      },
      layouts: {}
    }
  }

  /**
   *
   * @returns {ICmsLayout}
   */
  static getDefaultCmsLayout () {
    return {
      css: {
        styles: {}
      },
      structure: [],
      pageContainer: null
    }
  }

  /**
   * @returns {ICmsStructure}
   */
  static getDefaultCmsStructure () {
    return {
      component: '',
      data: {},
      css: {
        styles: {}
      }
    }
  }

  /**
   *
   * @param {ICmsRoute} route
   * @return {string}
   */
  static toUrl (route) {
    const isString = typeof route === 'string'

    if (!checkIsObject(route) && !isString) {
      throw new Error('route must be a string or object')
    }

    if (isString) {
      return route
    }

    let urlResult = '/'

    const pathSplit = route.path.split('/')

    const partsLength = pathSplit.length
    const hasParams = checkIsObject(route.params) && Boolean(Object.keys(route.params).length)

    pathSplit.forEach((part, index) => {
      if (part === '') {
        return
      }

      const firstChar = part.charAt(0)

      if (firstChar !== '' && firstChar !== ':') {
        urlResult += part
      } else if (firstChar === ':') {
        const clearParamKey = part.slice(1)

        urlResult += hasParams ? route.params[clearParamKey] : undefined
      }

      if (index < partsLength - 1) {
        urlResult += '/'
      }
    })

    const queryParams = new URLSearchParams()

    if (checkIsObject(route.query) && Object.keys(route.query).length) {
      for (const queryParamsKey in route.query) {
        if (Array.isArray(queryParams[queryParamsKey])) {
          queryParams[queryParamsKey].forEach((value) => {
            queryParams.append(queryParamsKey, value)
          })
        } else {
          queryParams.append(queryParamsKey, String(route.query[queryParamsKey]))
        }
      }
    }

    const queryString = queryParams.toString()

    if (queryString) {
      urlResult += `?${queryString}`
    }

    return urlResult
  }
}
