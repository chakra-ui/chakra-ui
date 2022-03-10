import { merge } from "webpack-merge"

export function withEmotionVersionFallback(config: any) {
  const alias = Object.entries({
    "@emotion/core": "@emotion/core",
    "@emotion/styled": "@emotion/styled",
    "emotion-theming": "@emotion/react",
  }).reduce((acc, [packageName, alias]) => {
    if (isPackageInstalled(alias)) {
      acc[packageName] = require.resolve(alias)
    }
    return acc
  }, {})

  return merge(config, { resolve: { alias } })
}

function isPackageInstalled(alias: string) {
  try {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return Boolean(require(alias))
  } catch (e) {
    return false
  }
}
