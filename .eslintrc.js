const { createConfig } = require("eslint-config-galex/src/createConfig")
const {
  createReactOverride,
} = require("eslint-config-galex/src/overrides/react")
const {
  createTSOverride,
} = require("eslint-config-galex/src/overrides/typescript")

const packageJson = require("./package.json")
const tsConfig = require("./tsconfig.json")

const react = {
  hasReact: true,
  isCreateReactApp: false,
  isNext: false,
  version: packageJson.devDependencies.react,
}

const typescript = {
  config: tsConfig,
  hasTypeScript: true,
  version: packageJson.devDependencies.react,
}

const TSOverride = createTSOverride({
  react,
  typescript,
})

const reactOverride = createReactOverride({
  react,
  rules: {
    "react/function-component-definition": "off",
  },
  typescript,
})

module.exports = createConfig({
  overrides: [reactOverride, TSOverride],
  rules: {
    "import/no-namespace": "off",
  },
})
