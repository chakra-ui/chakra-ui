const { declare } = require("@babel/helper-plugin-utils")
const annotateAsPure = require("@babel/helper-annotate-as-pure").default
const { types } = require("@babel/core")

const BABEL_ENV = process.env.BABEL_ENV
const isCommonJS = BABEL_ENV !== undefined && BABEL_ENV === "cjs"
const isESM = BABEL_ENV !== undefined && BABEL_ENV === "esm"

module.exports = function (api) {
  api.cache(true)

  const presets = [
    [
      "@babel/env",
      {
        loose: true,
        modules: isCommonJS ? "commonjs" : false,
        targets: {
          esmodules: isESM ? true : undefined,
        },
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ]

  const plugins = [
    transformPureCalls,
    "@babel/plugin-proposal-class-properties",
  ]

  return {
    presets,
    plugins,
  }
}

const PURE_CALLS = new Map([
  ["@chakra-ui/system", ["forwardRef", "memo"]],
  ["@chakra-ui/react", ["forwardRef", "memo"]],
])

const transformPureCalls = declare((api) => {
  api.assertVersion(7)

  return {
    name: "transform-react-pure-annotations",
    visitor: {
      CallExpression(path) {
        if (isImported(path)) {
          annotateAsPure(path)
        }
      },
    },
  }

  function isImported(path) {
    if (!types.isMemberExpression(path.node.callee)) {
      const callee = path.get("callee")
      for (const [module, methods] of PURE_CALLS) {
        for (const method of methods) {
          if (callee.referencesImport(module, method)) {
            return true
          }
        }
      }

      return false
    }

    return false
  }
})
