export default class CmsEngineUtils {
  /**
   *
   * @param {string} url
   * @param {string} config
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
        }
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
}
