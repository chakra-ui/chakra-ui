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

  let plugins = [
    "babel-plugin-chakra-ui",
    "@babel/plugin-proposal-class-properties",
  ]

  // if babel is building replace the /src paths to use packages from node_modules
  if (!process.env.STORYBOOK) {
    plugins = [
      ...plugins,
      [
        "replace-import",
        {
          src: /^@chakra-ui\/([\w-]+)\/src/,
          dest: "@chakra-ui/$1",
        },
      ],
    ]
  }

  return {
    presets,
    plugins,
  }
}
