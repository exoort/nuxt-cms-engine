function checkIsObject (value) {
  return !(value instanceof Date) && !Array.isArray(value) && !Object.is(value, null) && !Object.is(value, undefined) && !(value instanceof Function)
}

const URL_SPLIT_LIMIT = 10
const URL_SEPARATOR = '/'

module.exports = class CmsEngineUtils {
  /**
   *
   * @param {string} url
   * @param {ICms} config
   * @returns {ICmsPage|null}
   */
  static getPageConfig (url, config) {
    let searched = config.pages[url]

    if (!searched) {
      const splittedUrl = CmsEngineUtils.getFullUrlParts(url, URL_SPLIT_LIMIT)

      const splittedUrlLength = splittedUrl.length

      for (const pageUrl in config.pages) {
        const pageUrlLength = config.pages[pageUrl].fullUrlParts.length
        const detectByCount = config.pages[pageUrl].detectBy.length

        if (splittedUrlLength === pageUrlLength && pageUrl !== URL_SEPARATOR) {
          let matchedCount = 0

          for (const index in config.pages[pageUrl].fullUrlParts) {
            if (
              config.pages[pageUrl].fullUrlParts[index] &&
              splittedUrl[index] === config.pages[pageUrl].fullUrlParts[index]
            ) {
              matchedCount += 1
            }
          }

          if (matchedCount === detectByCount) {
            searched = config.pages[pageUrl]
          }
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
    const splittedCmsUrl = CmsEngineUtils.getFullUrlParts(cmsUrl)
    const splittedUrl = CmsEngineUtils.getFullUrlParts(url, URL_SPLIT_LIMIT)

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
   * @param {boolean} mockDynamic
   * @returns {string[]}
   */
  static getDetectBy (url, mockDynamic = false) {
    const detectBy = []

    const urlParts = CmsEngineUtils.getFullUrlParts(url, URL_SPLIT_LIMIT)

    for (const urlPart of urlParts) {
      if (mockDynamic && urlPart[0] === ':') {
        detectBy.push('')
      } else if (urlPart[0] !== ':' && urlPart !== URL_SEPARATOR) {
        detectBy.push(urlPart)
      }
    }

    return detectBy
  }

  /**
   *
   * @param {string} url
   * @param {number | undefined} limit
   * @returns {string[]}
   */
  static getFullUrlParts (url, limit = undefined) {
    const splittedUrl = url.split(URL_SEPARATOR, limit)

    if (splittedUrl[splittedUrl.length - 1] === '') {
      splittedUrl.pop()
    }

    if (splittedUrl[0] === '') {
      splittedUrl.shift()
    }

    return splittedUrl
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

    const pathSplit = CmsEngineUtils.getFullUrlParts(route.path)

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
