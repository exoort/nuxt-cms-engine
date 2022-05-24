export function getPageConfig (url, config) {
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

export function getRouteParams (url, cmsUrl) {
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
